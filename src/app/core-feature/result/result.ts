import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ResultService, SelectionItem } from './result-service';
import { MatDialog } from '@angular/material/dialog';
import { SelectionDialogComponent, SelectionDialogData } from '../result/selection-dialog-component/selection-dialog-component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result {
  private gridApi!: GridApi;
  rowData: any[] = [];

  searchFilter: string = '';
  selectionItems: SelectionItem[] = [];
  currentEditingRow: any = null;

  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      field: '',
      maxWidth: 40,
      pinned: 'left',
      resizable: false,
    },
    {
      field: 'athlete',
      pinned: 'left',
      cellStyle: {
        'background-color': '#D3D3D3',
      }
    },
    {
      field: 'age', cellEditor: 'agNumberCellEditor',
      pinned: 'left',
      cellEditorParams: {
        precision: 0,
        step: 1,
        showStepperButtons: true,
        min: 0,
      },
      cellStyle: {
        'background-color': '#D3D3D3',
      },
    },
    {
      field: 'country',
      pinned: 'left',
      cellStyle: {
        'background-color': '#D3D3D3',
      }
    },
    {
      field: 'year', pinned: true,
      cellStyle: {
        'background-color': '#D3D3D3',
      }
    },
    {
      headerName: 'Medals Results',
      suppressStickyLabel: true,
      openByDefault: true,
      children: [
        {
          field: 'sport',
          colId: 'sport',
          cellStyle: { 'background-color': '#e3f2fd' },
          valueGetter: (params: any) => {
            return params.data.status || params.data.sport;
          },
          tooltipValueGetter: (params: any) => {
            if (params.data.status) {
              return `Sport: ${params.data.sport}\nStatus: ${params.data.status}`;
            }
            return `Sport: ${params.data.sport}\nClick to set status`;
          },
          onCellClicked: (event: any) => {
            this.currentEditingRow = event.data;
            this.openSelectionModal('sport');
          }
        },
        { field: 'gold', colId: 'gold', columnGroupShow: 'open' },
        { field: 'silver', colId: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', colId: 'bronze', columnGroupShow: 'open' },
        { field: 'total', colId: 'total', columnGroupShow: 'closed' },
      ]
    }
  ];

  defaultColDef: ColDef = {
    width: 200,
    sortable: false,
    editable: true,
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params),
    groupHeaderHeight: undefined,
    headerHeight: undefined,
    floatingFiltersHeight: undefined
  };

  // Selection column definitions
  selectionColDefs: ColDef[] = [
    {
      field: 'list',
      headerName: 'List',
      flex: 1,
      filter: true
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
      filter: true
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      filter: true
    }
  ];

  selectionDefaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(
    private resultService: ResultService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.resultService.getOlympicAthletes().subscribe({
      next: (data) => {
        console.log('Data received in component:', data);
        this.rowData = data;
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
  }

  // Sport-based selection generator
  generateSelectionItemsBasedOnSport(sport: string): SelectionItem[] {
    let sportBasedItems: SelectionItem[] = [];

    const generalSportItems: SelectionItem[] = [];

    const sportLower = sport.toLowerCase();

    // Swimming specific items
    if (sportLower.includes('swimming')) {
      sportBasedItems.push(
        { list: 'Aquatic Champion', code: 'AQUATIC_CHAMP', description: '' },
        { list: 'Pool Specialist', code: 'POOL_SPECIALIST', description: '' },
        { list: 'Water Endurance', code: 'WATER_ENDURANCE', description: '' },
        { list: 'Stroke Technician', code: 'STROKE_TECH', description: '' },
       
      );
    }

    // Athletics specific items
    else if (sportLower.includes('athletics')) {
      sportBasedItems.push(
        { list: 'Track Star', code: 'TRACK_STAR', description: '' },
        { list: 'Speed Demon', code: 'SPEED_DEMON', description: '' },
        { list: 'Field Specialist', code: 'FIELD_SPECIALIST', description: '' },
        { list: 'Endurance Athlete', code: 'ENDURANCE', description: '' },
       
      );
    }

    // Gymnastics specific items
    else if (sportLower.includes('gymnastics')) {
      sportBasedItems.push(
        { list: 'Artistic Performer', code: 'ARTISTIC_PERF', description: '' },
        { list: 'Balance Specialist', code: 'BALANCE_SPEC', description: '' },
        { list: 'Flexibility Expert', code: 'FLEXIBILITY_EXP', description: '' },
        { list: 'Apparatus Master', code: 'APPARATUS_MASTER', description: '' },
        
      );
    }

    return [...sportBasedItems, ...generalSportItems];
  }

  
  openSelectionModal(generatorType: string = 'sport') {
    if (!this.currentEditingRow) {
      console.error('No row selected for editing');
      return;
    }

    console.log(`Generating options using: ${generatorType} for athlete:`, this.currentEditingRow.athlete);

    
    switch (generatorType) {
      case 'sport':
        this.selectionItems = this.generateSelectionItemsBasedOnSport(
          this.currentEditingRow.sport
        );
        break;
      default:
        this.selectionItems = this.generateSelectionItemsBasedOnSport(
          this.currentEditingRow.sport
        );
        break;
    }

    
    const dialogRef = this.dialog.open(SelectionDialogComponent, {
     
      data: {
        currentEditingRow: this.currentEditingRow,
        selectionItems: this.selectionItems,
        selectionColDefs: this.selectionColDefs,
        selectionDefaultColDef: this.selectionDefaultColDef
      } as SelectionDialogData
    });

    dialogRef.afterClosed().subscribe((result: SelectionItem | undefined) => {
      if (result) {
        this.confirmSelection(result);
      }
      this.currentEditingRow = null;
    });
  }

  
  confirmSelection(selectedItem: SelectionItem) {
    if (this.currentEditingRow) {
      console.log('Selected item:', selectedItem);

      const selectedStatus = selectedItem.code;
      const athleteName = this.currentEditingRow.athlete;

      
      const updatedRowData = this.rowData.map(row => {
        if (row === this.currentEditingRow) {
          return {
            ...row,
            status: selectedStatus
          };
        }
        return row;
      });

      this.rowData = updatedRowData;

     
      if (this.gridApi) {
        this.gridApi.setGridOption('rowData', this.rowData);
      }

      alert(`Athlete: ${athleteName}\nStatus updated to: ${selectedStatus}\n\n${selectedItem.description}`);
    }
  }

  
}
