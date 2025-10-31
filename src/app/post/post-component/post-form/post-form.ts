import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form directly in constructor
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['ID']) {
        this.isEditMode = true;
        this.personId = +params['ID'];
        this.loadPersonData(this.personId);
      }
    });
  }

  loadPersonData(id: number): void {
    const personData = this.getPersonById(id);
    if (personData) {
      this.personForm.patchValue({
        name: personData.name,
        location: personData.location,
        price: personData.price
      });
    }
  }

  getPersonById(id: number): any {
    const mockData = [
      { ID: 1, name: 'Mulalo', location: 'Kraaifontein', price: 50 },
      { ID: 2, name: 'Karen', location: 'Bellvile', price: 40 },
      { ID: 3, name: 'Sesethu', location: 'Philip', price: 45 },
      { ID: 4, name: 'Olwethu', location: 'Langa', price: 15 },
      { ID: 5, name: 'Matthwe', location: 'Cape Town', price: 20 },
      { ID: 6, name: 'Kerwin', location: 'Mowbray', price: 10 }
    ];
    return mockData.find(person => person.ID === id);
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const formData = this.personForm.value;

      if (this.isEditMode && this.personId) {
        console.log('Updating person:', this.personId, formData);
      } else {
        console.log('Creating new person:', formData);
      }

      this.router.navigate(['/postComponent']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/postComponent']);
  }
}
