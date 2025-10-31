import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgChart } from './ag-chart';

describe('AgChart', () => {
  let component: AgChart;
  let fixture: ComponentFixture<AgChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
