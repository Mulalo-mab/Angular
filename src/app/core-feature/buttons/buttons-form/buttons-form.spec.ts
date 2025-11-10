import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsForm } from './buttons-form';

describe('ButtonsForm', () => {
  let component: ButtonsForm;
  let fixture: ComponentFixture<ButtonsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
