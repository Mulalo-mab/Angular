import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  Edit?: string;
  Id: string;
  Name: string;
  Location: string;
  age: number;
  Money: string;
}

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {
  private apiUrl = 'assets/data/user.json';
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.users);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
        this.usersSubject.next([...this.users]);
        console.log('Users loaded successfully:', data);
      },
      error: (error) => {
        console.error('Error loading users from JSON:', error);
        this.users = [];
        this.usersSubject.next([]);
      }
    });
  }

  getUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return this.users$;
    } else {
      return this.http.get<User[]>(this.apiUrl).pipe(
        tap(data => {
          this.users = data;
          this.usersSubject.next([...this.users]);
        })
      );
    }
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.users.find(u => u.Id === id);
    return new Observable(observer => {
      if (user) {
        observer.next(user);
        observer.complete();
      } else {
        this.getUsers().subscribe(users => {
          const foundUser = users.find(u => u.Id === id);
          observer.next(foundUser);
          observer.complete();
        });
      }
    });
  }

  addUser(user: User): Observable<User> {
    user.Id = (this.users.length + 1).toString();
    this.users.push(user);
    this.usersSubject.next([...this.users]);
    return new Observable(observer => {
      observer.next(user);
      observer.complete();
    });
  }

  updateUser(updatedUser: User): Observable<User> {
    const index = this.users.findIndex(u => u.Id === updatedUser.Id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      this.usersSubject.next([...this.users]);
    }
    return new Observable(observer => {
      observer.next(updatedUser);
      observer.complete();
    });
  }

  deleteUser(id: string): Observable<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.Id !== id);
    this.usersSubject.next([...this.users]);
    return new Observable(observer => {
      observer.next(this.users.length < initialLength);
      observer.complete();
    });
  }

  archiveUser(id: string): Observable<boolean> {
    console.log(`Archiving user ${id}`);
    // You can add archive logic here if needed
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  refreshData(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
        this.usersSubject.next([...this.users]);
        console.log('Users refreshed successfully');
      },
      error: (error) => {
        console.error('Error refreshing users:', error);
      }
    });
  }
}
