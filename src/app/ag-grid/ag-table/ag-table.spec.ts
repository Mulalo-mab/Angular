import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTable } from './ag-table';

describe('AgTable', () => {
  let component: AgTable;
  let fixture: ComponentFixture<AgTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
