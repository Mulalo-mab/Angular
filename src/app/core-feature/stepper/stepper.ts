import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.html',
  styleUrl: './stepper.css'
})
export class Stepper {
  @ViewChild('stepper1') stepper1!: MatStepper;
  @ViewChild('stepper2') stepper2!: MatStepper;

  isLinear = false;

  firstFormGroup1!: FormGroup;
  secondFormGroup1!: FormGroup;

  firstFormGroup2!: FormGroup;
  secondFormGroup2!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup1 = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.email]]
    });

    
    this.firstFormGroup2 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup2 = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.min(1), Validators.max(120)]]
    });
  }
}
