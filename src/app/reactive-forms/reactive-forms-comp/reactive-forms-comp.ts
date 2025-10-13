import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-comp',
  standalone: false,
  templateUrl: './reactive-forms-comp.html',
  styleUrl: './reactive-forms-comp.css'
})
export class ReactiveFormsComp {
  registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
}
