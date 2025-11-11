import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';


function getData() {
  return [
    { station: 'Station A', early: 3, morningPeak: 7, afternoonPeak: 5 },
    { station: 'Station B', early: 5, morningPeak: 8, afternoonPeak: 6 },
    { station: 'Station C', early: 2, morningPeak: 5, afternoonPeak: 4 },
    { station: 'Station D', early: 4, morningPeak: 6, afternoonPeak: 7 },
  ];
}


@Component({
  selector: 'app-ag-charts',
  standalone: false,
  templateUrl: './ag-charts.html',
  styleUrl: './ag-charts.css',
})
export class AgCharts {

  public chartOptions: AgChartOptions;

  private barChartConfig = {
    title: { text: 'Passenger Data - Bar Chart' },
    series: [
      {
        type: 'type',
        xKey: 'station',
        yKey: 'early',
        yName: 'Early',
        stacked: true,
      },
      {
        type: 'type',
        xKey: 'station',
        yKey: 'morningPeak',
        yName: 'Morning Peak',
        stacked: true,
      },
      {
        type: 'type',
        xKey: 'station',
        yKey: 'afternonPeak',
        yName: 'Afternoon Peak',
        stacked: true,
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Station' }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Passengers' },
        label: { formatter: ({ value }: { value: number }) => `${value} k` }
      }
    ]
  };


  private lineChartConfig = {
    title: { text: 'Passenger Data - Line chart' },
    series: [
      {
        type: 'line',
        xKey: 'station',
        yKey: 'early',
        yName: 'Early'
      },
      {
        type: 'line',
        xKey: 'station',
        yKey: 'morningPeak',
        yName: 'Morning Peak'
      },
      {
        type: 'line',
        xKey: 'station',
        yKey: 'afternoonPeak',
        yName: 'Afternoon Peak'
      },
    ],
    axes: [
      { type: 'category', position: 'bottom', title: { text: 'Station' } },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Passengers' },
        label: { formatter: ({ value }: { value: number }) => `${value}k` }
      }
    ]
  };



  private areaChartConfig = {
    title: { text: 'Passenger Data - Area Chart' },
    series: [
      { type: 'area', xKey: 'station', yKey: 'early', yName: 'Early', fillOpacity: 0.6, stacked: true },
      { type: 'area', xKey: 'station', yKey: 'morningPeak', yName: 'Morning Peak', fillOpacity: 0.6, stacked: true },
    ],
    axes: [
      { type: 'category', position: 'bottom', title: { text: 'Station' } },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Passengers' },
        label: { formatter: ({ value }: { value: number }) => `${value}k` }
      }
    ]
  };


  private pieChartConfig = {
    title: { text: 'Morning Peak Distribution - Pie Chart' },
    series: [
      {
        type: 'pie',
        angleKey: 'morningPeak',
        calloutLabelKey: 'station',
        sectorLabelKey: 'morningPeak',
      }
    ]
  };


  private donutChartConfig = {
    title: { text: 'Morning Peak Distribution - Donut Chart' },
    series: [
      {
        type: 'donut',
        angleKey: 'morningPeak',
        calloutLabelKey: 'station',
        sectorLabelKey: 'morningPeak',
        innerRadiusRatio: 0.6,
      }
    ]
  };



  constructor() {
    this.switchToBarChart(); // default chart
  }

  switchToBarChart() {
    this.chartOptions = { data: getData(), ...this.barChartConfig };
  }

  switchToLineChart() {
    this.chartOptions = { data: getData(), ...this.lineChartConfig };
  }

  switchToAreaChart() {
    this.chartOptions = { data: getData(), ...this.areaChartConfig };
  }

  switchToPieChart() {
    this.chartOptions = { data: getData(), ...this.pieChartConfig };
  }

  switchToDonutChart() {
    this.chartOptions = { data: getData(), ...this.donutChartConfig };
  }
}




