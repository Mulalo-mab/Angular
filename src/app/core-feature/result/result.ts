import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ResultService, SelectionItem }from './result-service';

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

  // Selection modal variables
  showSelectionModal: boolean = false;
  searchFilter: string = '';
  selectionItems: SelectionItem[] = [];
  filteredSelectionItems: SelectionItem[] = [];
  selectedGridItem: SelectionItem | null = null;
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
      cellStyle: {'background-color': '#D3D3D3',
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

  constructor(private resultService: ResultService) { }

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

    const generalSportItems: SelectionItem[] = [
      { list: 'Olympic Athlete', code: 'OLYMPIC_ATHLETE', description: '' },
      { list: 'Elite Competitor', code: 'ELITE_COMPETITOR', description: '' },
      { list: 'International Player', code: 'INTERNATIONAL', description: '' }
    ];

    const sportLower = sport.toLowerCase();

    // Swimming specific items
    if (sportLower.includes('swimming')) {
      sportBasedItems.push(
        { list: 'Aquatic Champion', code: 'AQUATIC_CHAMP', description: '' },
        { list: 'Pool Specialist', code: 'POOL_SPECIALIST', description: '' },
        { list: 'Water Endurance', code: 'WATER_ENDURANCE', description: '' },
        { list: 'Stroke Technician', code: 'STROKE_TECH', description: '' },
        { list: 'Medley Expert', code: 'MEDLEY_EXPERT', description: '' }
      );
    }

    // Athletics specific items
    else if (sportLower.includes('athletics')) {
      sportBasedItems.push(
        { list: 'Track Star', code: 'TRACK_STAR', description: '' },
        { list: 'Speed Demon', code: 'SPEED_DEMON', description: '' },
        { list: 'Field Specialist', code: 'FIELD_SPECIALIST', description: '' },
        { list: 'Endurance Athlete', code: 'ENDURANCE', description: '' },
        { list: 'Power Performer', code: 'POWER_PERFORMER', description: '' }
      );
    }

    // Gymnastics specific items
    else if (sportLower.includes('gymnastics')) {
      sportBasedItems.push(
        { list: 'Artistic Performer', code: 'ARTISTIC_PERF', description: '' },
        { list: 'Balance Specialist', code: 'BALANCE_SPEC', description: '' },
        { list: 'Flexibility Expert', code: 'FLEXIBILITY_EXP', description: '' },
        { list: 'Apparatus Master', code: 'APPARATUS_MASTER', description: '' },
        { list: 'Rhythmic Artist', code: 'RHYTHMIC_ARTIST', description: '' }
      );
    }

 
    return [...sportBasedItems, ...generalSportItems];
  }

  // Modal methods
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

    this.filteredSelectionItems = [...this.selectionItems];
    this.showSelectionModal = true;
    this.searchFilter = '';
    this.selectedGridItem = null;
  }

  closeSelectionModal() {
    this.showSelectionModal = false;
    this.selectedGridItem = null;
    this.currentEditingRow = null;
  }

  onSearchFilterChange(filterValue: string) {
    console.log('Filtering:', filterValue);
    if (!filterValue.trim()) {
      this.filteredSelectionItems = [...this.selectionItems];
    } else {
      const filterLower = filterValue.toLowerCase().trim();
      this.filteredSelectionItems = this.selectionItems.filter(item =>
        item.list.toLowerCase().includes(filterLower) ||
        item.code.toLowerCase().includes(filterLower) ||
        item.description.toLowerCase().includes(filterLower)
      );
    }
  }

  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    this.selectedGridItem = selectedRows.length > 0 ? selectedRows[0] : null;
  }

  onRowDoubleClicked(event: any) {
    this.selectedGridItem = event.data;
    this.confirmSelection();
  }

  confirmSelection() {
    if (this.selectedGridItem && this.currentEditingRow) {
      console.log('Selected item:', this.selectedGridItem);

      const selectedStatus = this.selectedGridItem.code;
      const athleteName = this.currentEditingRow.athlete;

      // UPDATE THE GRID DATA
      const updatedRowData = this.rowData.map(row => {
        if (row === this.currentEditingRow) {
          return {
            ...row,
            status: selectedStatus  // Add status field to the row
          };
        }
        return row;
      });

      this.rowData = updatedRowData;

      // Also update the grid if it's ready
      if (this.gridApi) {
        this.gridApi.setGridOption('rowData', this.rowData);
      }

      alert(`Athlete: ${athleteName}\nStatus updated to: ${selectedStatus}\n\n${this.selectedGridItem.description}`);

      this.closeSelectionModal();
    }
  }
}
