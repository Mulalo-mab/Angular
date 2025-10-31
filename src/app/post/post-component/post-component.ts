import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { AgCharts } from 'ag-charts-angular';
import { AgBarSeriesOptions, AgChartOptions, AgLineSeriesOptions, AgCategoryAxisOptions, AgNumberAxisOptions, AgChartLegendOptions } from 'ag-charts-community';
import { Router } from '@angular/router'


@Component({
  selector: 'app-post-component',
  standalone: false,
  templateUrl: './post-component.html',
  styleUrl: './post-component.css'
})
export class PostComponent {

 

  rowData = [
    { edit: '', ID: 1, name: 'Mulalo', location: 'Kraaifontein', price: 50, },
    { edit: '', ID: 2, name: 'Karen', location: 'Bellvile', price: 40 },
    { edit: '', ID: 3, name: 'Sesethu', location: 'Philip', price: 45, },
    { edit: '', ID: 4, name: 'Olwethu', location: 'Langa', price: 15, },
    { edit: '', ID: 5, name: 'Matthwe', location: 'Cape Town', price: 20, },
    { edit: '', ID: 6, name: 'Kerwin', location: 'Mowbray', price: 10}
  ];

  colDefs: ColDef[] = [
    {
      field: "Edit",
      width: 80,
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="bi bi-pencil-square"></i>';
        button.classList.add('btn', 'btn-sm', 'edit-btn');
        button.style.cssText = 'background-color: white; color: #337ab7; border: 1px solid #337ab7; border-radius: 0.25rem; cursor: pointer; padding: 0.15rem 0.5rem;';

        button.addEventListener('click', () => {
          this.editPerson(params.data.ID);
        });

        return button;
      },
    },
    { field: 'ID', width: 80 },
    { field: 'name', width: 100},
    { field: 'location', width: 100 },
    { field: 'price', width: 100 }
  ];

  


  public barChartOptions: AgChartOptions = {
    title: { text: 'Transport Money' },
    data: [],
    series: [
      {
        type: 'bar',
        xKey: 'name',
        yKey: 'price',
        yName: 'Price',
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: { rotation: -45 },
        title: { text: 'Names' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Price' }
      }
    ]
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart(): void {
    this.barChartOptions = {
      ...this.barChartOptions,
      data: this.rowData
    };
  }

  createNewPerson(): void {
    this.router.navigate(['/postForm/create']);
  }

  editPerson(id: number): void {
    this.router.navigate(['/postForm/edit', id]);
  }

  refreshData(newData: any[]): void {
    this.rowData = newData;
    this.updateChart();
  }
}


