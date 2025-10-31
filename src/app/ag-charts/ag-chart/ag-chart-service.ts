import { Injectable } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';

export interface ChartData {
  month: string;
  avgTemp: number;
  iceCreamSales: number;
}

export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut';

@Injectable({
  providedIn: 'root'
})
export class AgChartService {
  private chartData: ChartData[] = [
    { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
    { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
    { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
    { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
    { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
    { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
  ];

  getChartData(): ChartData[] {
    return this.chartData;
  }

  getBarChartOptions(): AgChartOptions {
    return {
      title: { text: 'Ice Cream Sales' },
      data: this.getChartData(),
      series: [
        {
          type: "bar",
          xKey: "month",
          xName: "Months",
          yKey: "iceCreamSales",
          yName: "Ice Cream Sales",
          label: {
            enabled: true,
            placement: 'outside-end',
            formatter: ({ value }: { value: number }) => `${value}`,
            color: 'black',
          },
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "avgTemp",
          yName: "Average Tempareture",
          label: {
            enabled: true,
            placement: "outside-end",
            formatter: ({ value }: {value: number}) => `${value} C`,
          }
        }
      ],
      axes: [
        {
          position: "bottom",
          type: "category",
          paddingInner: 0.4,
         // paddingOuter: 0.3,
          groupPaddingInner: 0.4,
          label: { rotation: -45 },
          title: {
            text: 'Months'
          },
        },
        {
          position: "left",
          type: "number",
          keys: ['iceCreamSales']
        },
        {
          position: "right",
          type: "number",
          keys: ['avgTemp'],
          title: {
            text: 'Ice Cream Sales'
          },
          label: { formatter: ({ value }: { value: number }) => `${value} °C` },
        },
        
      ],
      legend: {
        position: 'bottom-left',
      }
    };
  }

  getLineChartOptions(): AgChartOptions {
    return {
      title: { text: 'Average Temperature' },
      data: this.getChartData(),
      series: [
        {
          type: "line",
          xKey: "month",
          xName: "Month",
          yKey: "avgTemp",
          yName: "Average Temperature",
          marker: { enabled: true },
        }
      ],
      axes: [
        {
          position: "bottom",
          type: "category",
          label: { rotation: -45 },
          title: {
            text: 'Months'        },
        },
        {
          position: "left",
          type: "number",
          keys: ['avgTemp'],
          title: { text: 'Temperature (°C)' },
        },
      ],
      legend: {
        position: 'bottom-left',
      }
    };
  }

  getAreaChartOptions(): AgChartOptions {
    return {
      title: { text: 'Ice Cream Sales Trend' },
      data: this.getChartData(),
      series: [
        {
          type: 'area',
          xKey: 'month',
          xName: 'Months',
          yKey: 'iceCreamSales',
          yName: 'Ice Cream Sales',
          marker: { enabled: false, shape: 'circle' },
          
        },
        {
          type: 'area',
          xKey: 'month',
          xName: 'Months',
          yKey: 'avgTemp',
          yName: 'Average Temperature',
          marker: { enabled: false, shape: 'diamond' },
         
        }
      ],
      axes: [
        {
          position: 'bottom',
          type: 'category',
          label: { rotation: -45 },
          title: {
            text: 'Months'
          },
        },
        {
          position: "left",
          type: "number",
          keys: ['iceCreamSales'],
          title: { text: 'Sales Amount' },
        },
        {
          position: "right",
          type: "number",
          keys: ['avgTemp'],
          label: { formatter: ({ value }: { value: number }) => `${value} °C` },
          title: { text: 'Temperature (°C)' },
        },
      ],
      legend: {
        position: 'bottom-left',
      }
    };
  }

  getPieChartOptions(): AgChartOptions {
    return {
      title: { text: 'Ice Cream Sales Distribution' },
      data: this.getChartData(),
      series: [
        {
          type: "pie",
          angleKey: "iceCreamSales",
          calloutLabelKey: "month",
          sectorLabelKey: "iceCreamSales",
          sectorLabel: {
            formatter: ({ value }: { value: number }) => `${(value / 1000).toFixed(0)}K`,
          },
          fills: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
          strokes: ['#fff'],
        }
      ],
      legend: {
        position: 'bottom',
      }
    };
  }

  getDonutChartOptions(): AgChartOptions {
    return {
      title: { text: 'Ice Cream Sales Distribution' },
      data: this.getChartData(),
      series: [
        {
          type: 'donut',
          calloutLabelKey: 'month',
          angleKey: 'iceCreamSales',
          sectorLabelKey: 'iceCreamSales',
          sectorLabel: {
            formatter: ({ value }: { value: number }) => `${(value / 1000).toFixed(0)}K`,
          },
          innerRadiusOffset: -40,
          fills: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
          strokes: ['#fff'],
        }
      ],
      legend: {
        position: 'bottom',
      }
    };
  }

  




  getChartOptions(type: ChartType): AgChartOptions {
    switch (type) {
      case 'bar':
        return this.getBarChartOptions();
      case 'line':
        return this.getLineChartOptions();
      case 'area':
        return this.getAreaChartOptions();
      case 'pie':
        return this.getPieChartOptions();
      case 'donut':
        return this.getDonutChartOptions();
      default:
        return this.getBarChartOptions();
    }
  }

  getNextChartType(currentType: ChartType): ChartType {
    const chartTypes: ChartType[] = ['bar', 'line', 'area', 'pie', 'donut'];
    const currentIndex = chartTypes.indexOf(currentType);
    const nextIndex = (currentIndex + 1) % chartTypes.length;
    return chartTypes[nextIndex];
  }

  getButtonText(currentType: ChartType): string {
    const textMap = {
      'bar': 'Switch to Line Chart',
      'line': 'Switch to Area Chart',
      'area': 'Switch to Pie Chart',
      'pie': 'Switch to Donut Chart',
      'donut': 'Switch to Bar Chart'
    };
    return textMap[currentType];
  }

  
  addData(newData: ChartData): void {
    this.chartData.push(newData);
  }

 
  updateData(updatedData: ChartData[]): void {
    this.chartData = [...updatedData];
  }

  // Method to get data statistics (if needed)
  getDataStats(): { totalSales: number; averageTemp: number; months: number } {
    const totalSales = this.chartData.reduce((sum, item) => sum + item.iceCreamSales, 0);
    const averageTemp = this.chartData.reduce((sum, item) => sum + item.avgTemp, 0) / this.chartData.length;

    return {
      totalSales,
      averageTemp: Number(averageTemp.toFixed(1)),
      months: this.chartData.length
    };
  }

  
}
