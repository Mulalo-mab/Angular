import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../../shared/user-name.validator';
import { PasswordValidator } from '../../shared/password.validator';
import { Registration } from '../registration';

@Component({
  selector: 'app-reactive-forms-comp',
  standalone: false,
  templateUrl: './reactive-forms-comp.html',
  styleUrl: './reactive-forms-comp.css'
})
export class ReactiveFormsComp implements OnInit {
  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder,
              private registration: Registration  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validators: PasswordValidator }
    );

    const subscribeControl = this.registrationForm.get('subscribe');
    const emailControl = this.registrationForm.get('email');

    
    subscribeControl?.valueChanges.subscribe(checkedValue => {
      if (emailControl) {
        if (checkedValue) {
          emailControl.setValidators(Validators.required);
        } else {
          emailControl.clearValidators();
        }
        emailControl.updateValueAndValidity();
      }
      });
  }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Siya',
      password: 'test',
      confirmPassword: 'test'
    });
  }

  onSubmit() {
    const formValue = this.registrationForm.value;

    const payload = {
      name: formValue.userName,   
      email: formValue.email
    };

    console.log('Payload:', payload);

    this.registration.register(payload).subscribe({
      next: (response) => console.log('Success!', response),
      error: (error) => console.error('Error!', error)
    });
  }

}


