import { Component } from '@angular/core';
import { ColDef, ColTypeDef, GridApi } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { EditService } from '../edit/edit-service';


ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  private gridApi!: GridApi;
  rowData: any[] = [];

  ageOptions = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60
  ];



  columnDefs: ColDef[] = [
    {
      headerName: 'Names',
      field: 'athlete',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ["Michael Phelps", "Usain Bolt", "Simone Biles", "Katie Ledecky", "Larisa Latynina", "Paavo Nurmi"],
        valueListGap: 10,
        valueListMaxHeight: 120,
        valueListMaxWidth: 120
      }
    },
    {
      field: "age", type: 'editableColumn', cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        step: 1,
        min: 0,
        max: 100,
        showStepperButtons: true,
      }
    },
    { field: 'year' },
    { field: 'country' },
    { field: 'sport' },
    {field: 'total'},
  ];

  defaultColDef: ColDef = {
    width: 200,
    editable: true,
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params)
  };

  constructor(private editService: EditService) { }

  ngOnInit(): void {
    this.loadData();

  };



  loadData(): void {
    this.editService.getOlympicAthletes().subscribe({
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

  columnTypes: {
    [key: string]: ColTypeDef;
  } = {
      editableColumn: {
      editable: (params: any) => this.isCellEditable(params),
      cellStyle: (params: any) => {
        if (this.isCellEditable(params)) {
          return { backgroundColor: "#2244cc44" };
        }
        return null;
      }
      },
};

  isCellEditable(params: any): boolean {
    // Your custom logic here
    const nonEditableFields = ['total', 'sport'];
    return !nonEditableFields.includes(params.colDef.field);
  }


}
