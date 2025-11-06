import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGroup } from './column-group';

describe('ColumnGroup', () => {
  let component: ColumnGroup;
  let fixture: ComponentFixture<ColumnGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
