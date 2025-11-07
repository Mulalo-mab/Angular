import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, RowDropZoneParams, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ExternalDropService } from '../external-drop/external-drop-service';


ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-external-drop',
  standalone: false,
  templateUrl: './external-drop.html',
  styleUrl: './external-drop.css'
})
export class ExternalDrop {

  private gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    {
      field: 'athlete', rowDrag: true, filter: 'agTextColumnFilter', filterParams: {
        buttons: ['reset', 'apply'],
        caseSensitive: false,
      }
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    {
      headerName: 'Gold + Silver',
      colId: 'gold&silver',
      valueGetter: this.goldValueGetter,
    },
    {
      headerName: 'Rtotal',
      field: 'total',
      valueFormatter: this.currencyFormatter.bind(this)
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,

  };

  rowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params)
  };

  constructor(private externalDropService: ExternalDropService) { }

  ngOnInit(): void {
    this.loadData();

  };

  loadData(): void {
    this.externalDropService.getOlympicAthletes().subscribe({
      next: (data) => {
        console.log('Data received in component:', data);
        this.rowData = data.map((item: any, index: number) => ({
          ...item,
          color: index % 3 === 0 ? 'Red' : index % 3 === 1 ? 'Green' : 'Blue'
        }));

        if (this.gridApi) {
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

    this.addDropZones(params);

  }



  private createTile(data: any) {
    const el = document.createElement("div");
    el.classList.add("tile");
    el.classList.add(data.color.toLowerCase());
    el.innerHTML =
      '<div class="athlete">' + data.athlete + '</div>' +
      '<div class="age">Age: ' + data.age + '</div>' +
      '<div class="country">' + data.country + '</div>' +
      '<div class="year">' + data.year + '</div>'
      ;
    return el;
  }

  private addDropZones(params: GridReadyEvent) {
    const tileContainer = document.querySelector(".tile-container") as HTMLElement;

    if (tileContainer) {
      const dropZone: RowDropZoneParams = {
        getContainer: () => {
          return tileContainer as any;
        },
        onDragStop: (dragParams) => {
          const tile = this.createTile(dragParams.node.data);
          tileContainer.appendChild(tile);

          params.api.applyTransaction({ remove: [dragParams.node.data] });
        },
      };
      params.api.addRowDropZone(dropZone);
    }
  }

  private goldValueGetter(params: ValueGetterParams) {
    return params.data.gold + params.data.silver;
  }

  private currencyFormatter(params: ValueFormatterParams) {
    return "R" + this.formatNumber(params.value);
  }

  private formatNumber = (number: number): string => {
    if (!number) return '0';
    return Math.floor(number).toLocaleString();
  }

}
