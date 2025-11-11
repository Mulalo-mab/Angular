import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCharts } from './ag-charts';

describe('AgCharts', () => {
  let component: AgCharts;
  let fixture: ComponentFixture<AgCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCharts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
