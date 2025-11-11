import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

export interface User {
  id?: string;
  Name: string;
  Location: string;
  age: number;
  Money: number;
  createdDate?: string;
  modifiedDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ButtonsFormService {
  private apiUrl = 'assets/data/user.json';

  constructor(private http: HttpClient) { }

  // ========== DUMMY DATA ==========
  private getDummyUsers(): User[] {
    return [
      {
        id: '1',
        Name: 'John Smith',
        Location: 'New York',
        age: 30,
        Money: 5000,
        createdDate: '2024-01-15',
        modifiedDate: '2024-01-15'
      },
      {
        id: '2',
        Name: 'Sarah Johnson',
        Location: 'Los Angeles',
        age: 28,
        Money: 7500,
        createdDate: '2024-01-16',
        modifiedDate: '2024-01-16'
      },
      {
        id: '3',
        Name: 'Mike Wilson',
        Location: 'Chicago',
        age: 35,
        Money: 6200,
        createdDate: '2024-01-17',
        modifiedDate: '2024-01-17'
      },
      {
        id: '4',
        Name: 'Emily Davis',
        Location: 'Houston',
        age: 26,
        Money: 4800,
        createdDate: '2024-01-18',
        modifiedDate: '2024-01-18'
      },
      {
        id: '5',
        Name: 'David Brown',
        Location: 'Miami',
        age: 32,
        Money: 8900,
        createdDate: '2024-01-19',
        modifiedDate: '2024-01-19'
      }
    ];
  }

  private getDummyUser(): User {
    return {
      id: '1',
      Name: 'John Smith',
      Location: 'New York',
      age: 30,
      Money: 5000,
      createdDate: '2024-01-15',
      modifiedDate: '2024-01-15'
    };
  }

  // ========== SERVICE METHODS WITH DUMMY DATA FALLBACK ==========

  // CRUD Operations
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Using dummy user data');
        const user = this.getDummyUsers().find(u => u.id === id) || this.getDummyUser();
        return of(user).pipe(delay(500));
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Simulating successful user creation');
        const newUser = {
          ...user,
          id: 'USER-' + Date.now(),
          createdDate: new Date().toISOString()
        };
        return of(newUser).pipe(delay(800));
      })
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Simulating successful user update');
        const updatedUser = {
          ...user,
          id: id,
          modifiedDate: new Date().toISOString()
        };
        return of(updatedUser).pipe(delay(600));
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Using dummy users data');
        return of(this.getDummyUsers()).pipe(delay(300));
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Simulating successful user deletion');
        return of({ success: true, message: 'User deleted successfully' }).pipe(delay(400));
      })
    );
  }
}
