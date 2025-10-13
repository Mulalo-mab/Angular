import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee'
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: false,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit {

  public employees: Employee[] = [];
  public errorMessage: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.errorMessage = error;
      }
    });
  }


}
