import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRow } from './update-row';

describe('UpdateRow', () => {
  let component: UpdateRow;
  let fixture: ComponentFixture<UpdateRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
