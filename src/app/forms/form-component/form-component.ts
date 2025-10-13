import { Component } from '@angular/core';
import { User } from '../user';
import { Enrollment } from '../enrollment';

@Component({
  selector: 'app-form-component',
  standalone: false,
  templateUrl: './form-component.html',
  styleUrl: './form-component.css'
})
export class FormComponent {

  topics = ['Angular', 'React', 'Vue'];
  submitted = false;
  errorMessage = '';

  userModel = new User('', 'mulalo@gmail.com', 1234567898, '', 'morning', true);

  constructor(private enrollment: Enrollment) { }

  onSubmit() {
    this.submitted = true;
    this.enrollment.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.errorMessage = error.statusText
      )
  }


}
