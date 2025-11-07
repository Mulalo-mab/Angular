import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDrop } from './external-drop';

describe('ExternalDrop', () => {
  let component: ExternalDrop;
  let fixture: ComponentFixture<ExternalDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
