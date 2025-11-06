import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostComponentService } from '../post-component-service';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-post-form',
  standalone: false,
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostForm implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  personId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postComponentService: PostComponentService
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.personId = +params['id'];
        this.loadPersonData(this.personId);
      } else {
        this.isEditMode = false;
        this.personId = null;
      }
    });
  }

  loadPersonData(id: number): void {
    this.isLoading = true;
    this.postComponentService.getPersonById(id)
      .pipe(take(1))
      .subscribe(person => {
        this.isLoading = false;
        if (person) {
          this.personForm.patchValue({
            name: person.name,
            location: person.location,
            price: person.price
          });
        } else {
          console.error('Person not found with ID:', id);
          this.router.navigate(['/postComponent']);
        }
      });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.isLoading = true;
      const formData = this.personForm.value;

      if (this.isEditMode && this.personId) {
        
        this.postComponentService.updatePerson(this.personId, formData)
          .pipe(take(1))
          .subscribe({
            next: (updatedPerson) => {
              this.isLoading = false;
              console.log('Person updated successfully:', updatedPerson);
              this.router.navigate(['/postComponent']);
            },
            error: (error) => {
              this.isLoading = false;
              console.error('Error updating person:', error);
              alert('Error updating person. Please try again.');
            }
          });
      } else {
        
        this.postComponentService.createPerson(formData)
          .pipe(take(1))
          .subscribe({
            next: (newPerson) => {
              this.isLoading = false;
              console.log('Person created successfully:', newPerson);
              this.router.navigate(['/postComponent']);
            },
            error: (error) => {
              this.isLoading = false;
              console.error('Error creating person:', error);
              alert('Error creating person. Please try again.');
            }
          });
      }
    } else {
      
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/postComponent']);
  }

  
  private markFormGroupTouched(): void {
    Object.keys(this.personForm.controls).forEach(key => {
      const control = this.personForm.get(key);
      control?.markAsTouched();
    });
  }

  
  get f() {
    return this.personForm.controls;
  }
}
