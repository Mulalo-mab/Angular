import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsFormService } from './buttons-form-service';

@Component({
  selector: 'app-button-form',
  standalone: false,
  templateUrl: './buttons-form.html',
  styleUrl: './buttons-form.css'
})
export class ButtonsForm implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private buttonsFormService: ButtonsFormService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    if (this.isEditMode && this.userId) {
      this.loadUser();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      Id: [''], 
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Location: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      Money: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.buttonsFormService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          this.userForm.patchValue(data);
        },
        error: (error) => console.error('Error loading user', error)
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (this.isEditMode && this.userId) {
        this.buttonsFormService.updateUser(this.userId, formData).subscribe({
          next: () => {
            alert('User updated successfully!');
            this.goBack();
          },
          error: (error) => {
            console.error('Error updating user', error);
            alert('Error updating user. Please try again.');
          }
        });
      } else {
        this.buttonsFormService.createUser(formData).subscribe({
          next: () => {
            alert('User created successfully!');
            this.goBack();
          },
          error: (error) => {
            console.error('Error creating user', error);
            alert('Error creating user. Please try again.');
          }
        });
      }
    } else {
      this.markFormGroupTouched();
      alert('Please fill all required fields correctly.');
    }
  }

  onCancel(): void {
    this.goBack();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength}`;
      if (field.errors['min']) {
        if (fieldName === 'age') return 'Age must be at least 18';
        if (fieldName === 'Money') return 'Amount cannot be negative';
      }
      if (field.errors['max']) return 'Age must be less than 100';
    }
    return '';
  }
}
