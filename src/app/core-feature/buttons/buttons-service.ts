import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

export interface User {
  Edit?: string;
  Id: string;
  Name: string;
  Location: string;
  age: number;
  Money: string;
  Status?: string;
}

export interface SelectionItem {
  list: string;
  code: string;
  description: string;
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


  // Selection items 
  generateSelectionItemsBasedOnAge(userAge: number): SelectionItem[] {
    let ageBasedItems: SelectionItem[] = [];


    const generalItems: SelectionItem[] = [
      { list: 'Perfect Age', code: 'Perfect Age', description: 'Age is between 20-25 years' },
      { list: 'Good Age', code: 'Good Age', description: 'Age is between 25-30 years' },
      { list: 'Too Old', code: 'Too Old', description: 'Age is above 30 years' }
    ];

    if (userAge >= 20 && userAge <= 25) {
      ageBasedItems.push(
        { list: 'Young & Energetic', code: 'Young & Energetic', description: 'Great time for career building' },
        { list: 'Prime Learning Years', code: 'Prime Learning Years', description: 'Ideal for skill development' }
      );
    } else if (userAge > 25 && userAge <= 30) {
      ageBasedItems.push(
        { list: 'Career Growth Phase', code: 'Career Growth Phase', description: 'Time for professional advancement' },
        { list: 'Experience Building', code: 'Experience Building', description: 'Gaining valuable experience' }
      );
    } else if (userAge > 30) {
      ageBasedItems.push(
        { list: 'Senior Level', code: 'Senior Level', description: 'Time for leadership roles' },
        { list: 'Mature & Experienced', code: 'Mature & Experienced', description: 'Valuable experience gained' }
      );
    } else {
      ageBasedItems.push(
        { list: 'Too Young', code: 'Too Young', description: 'Age is below 20 years' },
        { list: 'Early Stage', code: 'Early Stage', description: 'Still in development phase' }
      );
    }

    return [...ageBasedItems, ...generalItems];
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    const userIndex = this.users.findIndex(user => user.Id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        Status: status
      };
      this.usersSubject.next([...this.users]);
    }

    return this.http.patch(`${this.apiUrl}/${userId}/status`, { status }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Simulating status update');
        return of({ success: true, message: 'Status updated successfully' }).pipe(delay(500));
      })
    );
  }

  getSelectionColDefs(): any[] {
    return [
      {
        field: 'list',
        headerName: 'List',
        flex: 1,
        filter: true
      },
      {
        field: 'code',
        headerName: 'Code',
        flex: 1,
        filter: true
      },
      {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        filter: true
      }
    ];
  }


  getSelectionDefaultColDef(): any {
    return {
      sortable: true,
      filter: true,
      resizable: true
    };
  }


}
