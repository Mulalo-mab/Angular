import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgBarSeriesOptions, AgChartOptions, AgLineSeriesOptions, AgCategoryAxisOptions, AgNumberAxisOptions, AgChartLegendOptions } from 'ag-charts-community';
import { getData, maleHeightWeight, femaleHeightWeight } from './data';


@Component({
  selector: 'app-ag-table',
  standalone: false,
  templateUrl: './ag-table.html',
  styleUrl: './ag-table.css'
})
export class AgTable {


  public lineOptions: AgChartOptions = {
    title: {
      text: '2023 Average Temperatures',
      fontWeight: 'bold',
    },
    subtitle: {
      text: 'Oxford, UK'
    },
    data: [
      { month: "January", max: 8.5, min: 2.6 },
      { month: "February", max: 10.4, min: 3.0 },
      { month: "March", max: 10.9, min: 4.7 },
      { month: "April", max: 13.7, min: 5.0 },
      { month: "May", max: 18.2, min: 8.4 },
      { month: "June", max: 23.6, min: 12.2 },
      { month: "July", max: 21.3, min: 13.0 },
      { month: "August", max: 21.9, min: 13.1 },
      { month: "September", max: 22.6, min: 13.2 },
      { month: "October", max: 17.0, min: 9.7 },
      { month: "November", max: 11.1, min: 4.9 },
      { month: "December", max: 10.2, min: 5.2 },
    ],
    series: [
      {
        type: 'line',
        xKey: 'month',
        yKey: 'max',
        yName: 'Maximum Tempareture',
        xName: 'Month',
        interpolation: { type: "smooth" },
      },
      {
        type: 'line',
        xKey: 'month',
        xName: 'Month',
        yKey: 'min',
        yName: 'Minimum Tempareture',
      }
    ],
    axes: [
      {
        position: 'bottom',
        type: 'category',
        label: {
          rotation: -45,
          autoRotate: false,
        }
      },
      {
        type: 'number',
        position: 'left'
      }
    ],
    legend: {
      position: 'bottom-left',
    }
  }



  public iceOptions: AgChartOptions = {
    title: {
      text: "Ice Cream Sales vs. Avg Temperature"
    },
    legend: {
      position: "bottom-left"
    },
    data: [
      { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
      { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
      { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
      { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
      { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
        yName: "Ice Cream Sales",
        label: {
          enabled: true,
          placement: 'outside-end',
          formatter: ({ value }: { value: number }) => `${value}`,
          color: 'black',
        }
      },
      {
        type: "line",
        xKey: "month",
        yKey: "avgTemp",
        yName: "Average Temperature",
        interpolation: { type: "smooth" },
        marker: {
          enabled: true,
          size: 6, 
          fill: '#ff6b6b',
          stroke: '#fff',
          strokeWidth: 1
        }
      }
    ],
    axes: [
      {
        position: "bottom",
        type: "category",
        paddingInner: 0.8,
        paddingOuter: 1,

        label: {
          rotation: -45,
        }
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
        label: {
          formatter: ({ value }: { value: number }) => `${value}°C`
        }
      }
    ]
  };

  public salesOption: AgChartOptions = {
    title: {
      text: 'Apple Revenue by Product Category',
    },
    subtitle: {
      text: 'In Billion U.S. Dollars',
    },
    data: getData(),
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    series: [
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'iphone',
        yName: 'iPhone',
        stacked: true,
        cornerRadius: 10,
        label: {
          placement: 'inside-center',
          fontWeight: 'bold',
        }
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'mac',
        yName: 'Mac',
        stacked: true,
        cornerRadius: 10,
        label: {
          placement: 'inside-center',
          fontWeight: 'bold',
        }
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'ipad',
        yName: 'iPad',
        stacked: true,
        cornerRadius: 10,
        label: {
          placement: 'inside-center',
          fontWeight: 'bold',
        }
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'wearables',
        yName: 'Wearables',
        stacked: true,
        cornerRadius: 10,
        label: {
          placement: 'inside-center',
          fontWeight: 'bold',
        },
      },
      {
        type: 'bar',
        stacked: true,
        cornerRadius: 10,
        xKey: 'quarter',
        yKey: 'services',
        yName: 'Services',
        label: {
          placement: 'inside-center',
          fontWeight: 'bold',
        },
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        paddingInner: 0.8,
        paddingOuter: 0.8,
      },
      {
        type: 'number',
        position: 'left',
      }
    ]
  }

  public donutOptions: AgChartOptions = {
    title: {
      text: 'Portfolio Composition',
    },
    data: [
      { asset: "Stocks", amount: 60000 },
      { asset: "Bonds", amount: 40000 },
      { asset: "Cash", amount: 7000 },
      { asset: "Real Estate", amount: 5000 },
      { asset: "Commodities", amount: 3000 },
    ],
    series: [
      {
        type: 'donut',
        calloutLabelKey: 'asset',
        angleKey: 'amount',
        innerRadiusRatio: 0.9,
      }    ]
  }




  public outOptions: AgChartOptions = {
    title: {
      text: 'Multiple Donut',
    },
    data: [
      { asset: "Stocks", previousYear: 70000, currentYear: 40000 },
      { asset: "Bonds", previousYear: 30000, currentYear: 60000 },
      { asset: "Cash", previousYear: 5000, currentYear: 7000 },
      { asset: "Real Estate", previousYear: 8000, currentYear: 5000 },
      { asset: "Commodities", previousYear: 4500, currentYear: 3000 },
    ],
    series: [
      {
        type: 'donut',
        title: { text: 'Previous Year' },
        calloutLabelKey: 'asset',
        legendItemKey: 'asset',
        angleKey: 'previousYear',
        outerRadiusRatio: 1,
        innerRadiusRatio: 0.9,
      },
      {
        type: 'donut',
        title: { text: 'Current Year' },
        legendItemKey: 'asset',
        showInLegend: false,
        angleKey: 'currentYear',
        outerRadiusRatio: 0.6,
        innerRadiusRatio: 0.2,
      },
    ],
  }

  public piesOptions: AgChartOptions = {
    title: {
      text: 'Pie Chart'
    },
    data: [
      { asset: "Stocks", amount: 60000 },
      { asset: "Bonds", amount: 40000 },
      { asset: "Cash", amount: 7000 },
      { asset: "Real Estate", amount: 5000 },
      { asset: "Commodities", amount: 3000 },
    ],
    series: [
      {
        type: 'pie',
        angleKey: 'amount',
        legendItemKey: 'asset',
        calloutLabelKey: 'asset',
        sectorLabelKey: 'amount',
      },
    ],
  }

  public scatterOptions: AgChartOptions = {
    title: {
      text: 'Weight vs Height',
    },
    subtitle: {
      text: 'by Gender',
    },
    series: [
      {
        type: 'bubble',
        title: 'Male',
        data: maleHeightWeight,
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        sizeKey: 'age',
        sizeName: 'Age',
      },
      {
        type: 'bubble',
        title: 'Female',
        data: femaleHeightWeight,
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        sizeKey: 'age',
        sizeName: 'Age'
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Height',
        },
        label: {
          formatter: ({ value }: { value: number }) => `${value} cm`,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Weight'
        },
        label: {
          formatter: ({ value }: { value: number }) => `${value} kg`,
        }
      }
    ]
  }







}
