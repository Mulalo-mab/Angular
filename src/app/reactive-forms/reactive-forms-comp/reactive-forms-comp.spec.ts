import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsComp } from './reactive-forms-comp';

describe('ReactiveFormsComp', () => {
  let component: ReactiveFormsComp;
  let fixture: ComponentFixture<ReactiveFormsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
