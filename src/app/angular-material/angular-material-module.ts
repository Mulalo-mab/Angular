/* { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AngularMaterialRoutingModule } from './angular-material-routing-module';
import { AngularMaterial } from './angular-material';
import { Autocomplete } from './autocomplete/autocomplete';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AngularMaterial,
    Autocomplete
  ],
  imports: [
    CommonModule,
    AngularMaterialRoutingModule,
    RouterModule, 
    ReactiveFormsModule, 
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
   
  ]
})
export class AngularMaterialModule { }*/
