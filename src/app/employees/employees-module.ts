import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeDetail } from './employee-detail/employee-detail';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: EmployeeList },         // default for /employees
  { path: 'employees-detail', component: EmployeeDetail }     // /employees/1, /employees/2, etc.
];


@NgModule({
  declarations: [
    EmployeeList,
    EmployeeDetail
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EmployeeList,
    EmployeeDetail
  ]
})
export class EmployeesModule { }
