import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from '../../../../node_modules/rxjs/dist/types/index';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string = 'assets/data/employees.json';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('data/employees.json');

   
  }
}
