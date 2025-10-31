import { Component, OnInit } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgChartService, ChartType } from './ag-chart-service';


@Component({
  selector: 'app-ag-chart',
  standalone: false,
  templateUrl: './ag-chart.html',
  styleUrl: './ag-chart.css'
})
export class AgChart  {
  public chartOptions: AgChartOptions;
  public currentChartType: ChartType = 'bar';
  public dataStats: any;
  

  constructor(private agChartService: AgChartService) {
    this.chartOptions = this.agChartService.getBarChartOptions();
  }

  ngOnInit(): void {
    this.updateDataStats();
  }

  toggleChartType(): void {
    this.currentChartType = this.agChartService.getNextChartType(this.currentChartType);
    this.chartOptions = this.agChartService.getChartOptions(this.currentChartType);
    this.updateDataStats();
  }

  setChartType(type: ChartType): void {
    this.currentChartType = type;
    this.chartOptions = this.agChartService.getChartOptions(type);
    this.updateDataStats();
  }

  getButtonText(): string {
    return this.agChartService.getButtonText(this.currentChartType);
  }

  private updateDataStats(): void {
    this.dataStats = this.agChartService.getDataStats();
  }

}
