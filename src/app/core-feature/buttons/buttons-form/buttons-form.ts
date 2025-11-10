import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonsService, User } from '../buttons-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buttons-form',
  standalone: false,
  templateUrl: './buttons-form.html',
  styleUrl: './buttons-form.css'
})
export class ButtonsForm implements OnInit {

  @Input() user: User | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<User>();
  @Output() formCancel = new EventEmitter<void>();


  userForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private buttonsService: ButtonsService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();

    console.log('Current route params:', this.route.snapshot.params);

    this.route.params.subscribe(params => {
      console.log('Route params changed:', params);
      if (params['id']) {
        this.isEditMode = true;
        console.log('Edit mode, loading user ID:', params['id']);
        this.loadUserData(params['id']);
      } else {
        this.isEditMode = false;
        console.log('Create mode');
      }
    });
  }


  initializeForm() {
    this.userForm = this.fb.group({
      Id: [''],
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Location: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      Money: ['', [Validators.required, Validators.min(0)]],
      Edit: ['']
    });
  }

  loadUserData(userId: string) {
    this.buttonsService.getUserById(userId).subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }



  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (this.isEditMode) {
        this.buttonsService.updateUser(formData).subscribe(updatedUser => {
          console.log('User updated:', updatedUser);
          this.router.navigate(['/users']); // Navigate back to user list
        });
      } else {
        // For new users, generate ID if not provided
        if (!formData.Id) {
          formData.Id = this.generateUserId();
        }

        this.buttonsService.addUser(formData).subscribe(newUser => {
          console.log('User created:', newUser);
          this.router.navigate(['/users']); // Navigate back to user list
        });
      }
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.router.navigate(['/users']); // Navigate back to user list
  }

  private generateUserId(): string {
    return Date.now().toString();
  }

}
