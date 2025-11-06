import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFeature } from './column-feature';

describe('ColumnFeature', () => {
  let component: ColumnFeature;
  let fixture: ComponentFixture<ColumnFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
