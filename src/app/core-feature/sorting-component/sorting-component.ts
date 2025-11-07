import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { SortingComponentService } from '../sorting-component/sorting-component-service';


ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-sorting-component',
  standalone: false,
  templateUrl: './sorting-component.html',
  styleUrl: './sorting-component.css'
})
export class SortingComponent {
  private gridApi!: GridApi;
  rowData: any[] = [];


  columnDefs: ColDef[] = [
    { field: 'athlete', rowDrag: true },
    { field: 'age', width: 90 },
    { field: 'country' },
    { field: 'year', width: 90 },
    { field: 'sport', cellStyle: { color: 'red', 'background-color': 'green' } },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params),
    getRowClass: (params: any) => {
      if (params.node.rowIndex === 0) {
        return 'first-row-highlight';
      }
      return '';
    }
  };

  constructor(private sortingComponentService: SortingComponentService) { }

  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void {
    this.sortingComponentService.getOlympicAthletes().subscribe({
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

  sortByAthleteAsc() {
    this.gridApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
      defaultState: { sort: null },
    });
  }

  sortByAthleteDesc() {
    this.gridApi.applyColumnState({
      state: [{ colId: "athlete", sort: "desc" }],
      defaultState: { sort: null },
    });
  }

  sortByCountryThenSport() {
    this.gridApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 0 },
        { colId: "sport", sort: "asc", sortIndex: 1 }
      ],
      defaultState: { sort: null },
    });
  }

  sortBySportThenCountry() {
    this.gridApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 1 },
        { colId: "sport", sort: "asc", sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
  }

  clearSort() {
    this.gridApi.applyColumnState({
      defaultState: { sort: null },
    });
  }

  saveSort() {
    const colState = this.gridApi.getColumnState();
    const sortState = colState
      .filter(function (s) {
        return s.sort != null;
      })
      .map(function (s) {
        return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
      });
    savedSort = sortState;
    console.log("saved sort", sortState);
  }

  restoreFromSave() {
    this.gridApi.applyColumnState({
      state: savedSort,
      defaultState: { sort: null },
    });
  }

}

let savedSort: any;
