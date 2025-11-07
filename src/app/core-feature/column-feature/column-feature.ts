import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ColumnFeatureService } from '../column-feature/column-feature-service';

@Component({
  selector: 'app-column-feature',
  standalone: false,
  templateUrl: './column-feature.html',
  styleUrl: './column-feature.css'
})
export class ColumnFeature implements OnInit {
  private gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { field: 'athlete', sortable: true, filter: false },
    { field: 'age', sortable: true, filter: false },
    { field: 'country', sortable: true, filter: false },
    { field: 'year', sortable: true, filter: false },
    { field: 'sport', sortable: true, filter: false },
    { field: 'gold', sortable: true, filter: false },
    { field: 'silver', sortable: true, filter: false },
    { field: 'bronze', sortable: true, filter: false },
    { field: 'total', sortable: true, filter: false }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params)
  };

  constructor(private columnFeatureService: ColumnFeatureService) { }

  ngOnInit(): void {
    this.loadData();

  };

  loadData(): void {
    this.columnFeatureService.getOlympicAthletes().subscribe({
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

    // If data is already loaded, set it on the grid
    if (this.rowData && this.rowData.length > 0) {
      console.log('Data already loaded, setting on grid');
      this.gridApi.setGridOption('rowData', this.rowData);
    } else {
      console.log('Data not loaded yet, grid will show empty');
    }
  }

  onBtSortOn(): void {
    this.gridApi.applyColumnState({
      state: [
        { colId: "age", sort: "desc" },
        { colId: "athlete", sort: "asc" },
      ],
    });
  }

  onBtSortOff(): void {
    this.gridApi.applyColumnState({
      defaultState: { sort: null }
    });
  }


  onBtWidthNarrow(): void {
    this.gridApi.setColumnWidths([
      { key: 'athlete', newWidth: 80 },
      { key: 'country', newWidth: 80 },
      { key: 'sport', newWidth: 80 }
    ]);
  }

  onBtWidthNormal(): void {
    this.gridApi.setColumnWidths([
      { key: 'athlete', newWidth: 200 },
      { key: 'country', newWidth: 150 },
      { key: 'sport', newWidth: 150 }
    ]);
  }


  onBtHide(): void {
    this.gridApi.setColumnsVisible(['age', 'year', 'silver', 'bronze'], false);
  }

  onBtShow(): void {
    this.gridApi.setColumnsVisible(['age', 'year', 'silver', 'bronze'], true);
  }


  onBtReverseOrder() {
    this.gridApi.applyColumnState({
      state: [
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "bronze" },
        { colId: "silver" },
        { colId: "gold" },
      ],
      applyOrder: true,
    });
  }

  onBtNormalOrder() {
    this.gridApi.applyColumnState({
      state: [
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "gold" },
        { colId: "silver" },
        { colId: "bronze" },
      ],
      applyOrder: true,
    });
  }


  onBtRowGroupOn(): void {
    this.columnDefs = this.columnDefs.map(col => {
      if (col.field === 'country' || col.field === 'sport') {
        return { ...col, rowGroup: true, hide: true };
      }
      return col;
    });
    this.gridApi.setGridOption('columnDefs', this.columnDefs);
  }

  onBtRowGroupOff(): void {
    this.columnDefs = this.columnDefs.map(col => ({
      ...col,
      rowGroup: false,
      hide: false
    }));
    this.gridApi.setGridOption('columnDefs', this.columnDefs);
  }


  onBtPinnedOn(): void {
    this.gridApi.setColumnsPinned(['athlete'], 'left');
    this.gridApi.setColumnsPinned(['total'], 'right');
  }

  onBtPinnedOff(): void {
    this.gridApi.setColumnsPinned(['athlete'], null);
    this.gridApi.setColumnsPinned(['total'], null);
  }

}
