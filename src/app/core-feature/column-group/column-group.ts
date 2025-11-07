import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ColumnGroupService } from './column-group-service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-column-group',
  standalone: false,
  templateUrl: './column-group.html',
  styleUrl: './column-group.css'
})
export class ColumnGroup {

  private gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Athlete Details',
      suppressStickyLabel: true,
      children: [
        { field: 'athlete', sortable: true, filter: true },
        { field: 'age', sortable: true, filter: true },
        { field: 'country', sortable: true, filter: true }
      ]
    },
    {
      headerName: 'Competition',
      suppressStickyLabel: true,
      children: [
        { field: 'year', sortable: true, },
        { field: 'sport', sortable: true },
      ]
    },
    {
      headerName: 'Medals',
      suppressStickyLabel: true,
      children: [
        { field: 'gold', sortable: true },
        { field: 'silver', sortable: true },
        { field: 'bronze', sortable: true },
        { field: 'total', sortable: true }
      ]
    }
  ];

  defaultColDef: ColDef = {
    width: 150,
    filter: true,
    floatingFilter: true,
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params),

    groupHeaderHeight: undefined,
    headerHeight: undefined,
    floatingFiltersHeight: undefined
  };

  constructor(private columnGroupService: ColumnGroupService) {}

  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void {
    this.columnGroupService.getOlympicAthletes().subscribe({
      next: (data) => {
        console.log('Data received in component:', data);
        this.rowData = data;
        // CRITICAL: Update the grid with the new data
        if (this.gridApi) {
          console.log('Setting rowData on gridApi');
          this.gridApi.setGridOption('rowData', this.rowData);
        }
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    console.log('Grid ready, current rowData length:', this.rowData.length);

    if (this.rowData && this.rowData.length > 0) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
    this.updateUI();
  }

  // Header Height Methods
  setGroupHeaderHeight(height: number | undefined): void {
    this.gridApi.setGridOption('groupHeaderHeight', height);
    this.updateElementText('groupHeaderHeight', height?.toString() || 'undefined');
  }

  setHeaderHeight(height: number | undefined): void {
    this.gridApi.setGridOption('headerHeight', height);
    this.updateElementText('headerHeight', height?.toString() || 'undefined');
  }



  setFloatingFiltersHeight(height: number | undefined): void {
    this.gridApi.setGridOption('floatingFiltersHeight', height);
    this.updateElementText('floatingFiltersHeight', height?.toString() || 'undefined');
  }

  // UI Helper Methods
  private updateElementText(elementId: string, text: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    }
  }



  private updateUI(): void {
    // Initialize UI elements
    this.updateElementText('groupHeaderHeight', 'undefined');
    this.updateElementText('headerHeight', 'undefined');
    this.updateElementText('floatingFiltersHeight', 'undefined');
  }

 
}
