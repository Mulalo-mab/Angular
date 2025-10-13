import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string = 'assets/data/employees.json';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('data/employees.json')
      .pipe(
        catchError(this.errorHandler))
   
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message || 'Server Error')
  }
}
