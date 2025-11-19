import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterial } from './angular-material';

describe('AngularMaterial', () => {
  let component: AngularMaterial;
  let fixture: ComponentFixture<AngularMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
