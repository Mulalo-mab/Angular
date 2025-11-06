import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { AgCharts } from 'ag-charts-angular';
import { AgBarSeriesOptions, AgChartOptions, AgLineSeriesOptions, AgCategoryAxisOptions, AgNumberAxisOptions, AgChartLegendOptions } from 'ag-charts-community';
import { Router } from '@angular/router'
import { PostComponentService, Person } from './post-component-service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-post-component',
  standalone: false,
  templateUrl: './post-component.html',
  styleUrl: './post-component.css'
})

export class PostComponent implements OnInit {
  rowData: Person[] = [];

  colDefs: ColDef[] = [
    {
      field: "edit",
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
    { field: 'name', width: 100 },
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

  constructor(
    private router: Router,
    private postComponentService: PostComponentService
  ) { }

  ngOnInit(): void {
    this.loadPersons();

    
    this.postComponentService.persons$.subscribe(persons => {
      this.rowData = persons;
      this.updateChart();
    });
  }

  loadPersons(): void {
    this.postComponentService.getPersons()
      .pipe(take(1))
      .subscribe(persons => {
        this.rowData = persons;
        this.updateChart();
      });
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

  refreshData(): void {
    this.postComponentService.refreshData();
  }

  
  deletePerson(id: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.postComponentService.deletePerson(id)
        .pipe(take(1))
        .subscribe(success => {
          if (success) {
            console.log('Person deleted successfully');
            
          } else {
            console.error('Failed to delete person');
          }
        });
    }
  }
}


