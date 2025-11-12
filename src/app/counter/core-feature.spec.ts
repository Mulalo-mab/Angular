import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFeature } from './core-feature';

describe('CoreFeature', () => {
  let component: CoreFeature;
  let fixture: ComponentFixture<CoreFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoreFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
