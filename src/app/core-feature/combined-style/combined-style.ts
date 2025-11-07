import { Component,OnInit } from '@angular/core';
import { ColDef, GridApi, CellClassParams, ICellRendererParams, ValueParserParams } from 'ag-grid-community';
import { CombinedStyleService } from '../combined-style/combined-style-service';
import { GridOptions, RowSelectionOptions } from 'ag-grid-community';


@Component({
  selector: 'app-combined-style',
  standalone: false,
  templateUrl: './combined-style.html',
  styleUrl: './combined-style.css'
})
export class CombinedStyle implements OnInit {
  private gridApi!: GridApi;
  rowData: any[] = [];


  ragCellClassRules = {
    "rag-green-outer": (params: any) => {
      const result = params.value === 2016;

      return result;
    },
    "rag-blue-outer": (params: any) => {
      const result = params.value === 2012;

      return result;
    },
    "rag-red-outer": (params: any) => {
      const result = params.value === 2008;

      return result;
    },
  };

  ragRenderer = (params: ICellRendererParams) => {
    return '<span class="rag-element">' + params.value + "</span>";
  };


  numberParser = (params: ValueParserParams) => {
    const newValue = params.newValue;
    let valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === "") {
      valueAsNumber = null;
    } else {
      valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
  };

  cellStyle = (params: CellClassParams) => {
    const color = this.numberToColor(params.value);
    return {
      backgroundColor: color,
    };
  };

  cellClass = (params: CellClassParams) => {
    return params.value === "Swimming" ? "rag-green" : "rag-blue";
  };

  numberToColor = (val: number) => {
    if (val === 0) {
      return "#ffaaaa";
    } else if (val == 1) {
      return "#aaaaff";
    } else {
      return "#aaffaa";
    }
  };



  columnDefs: ColDef[] = [
    { field: 'athlete' },
    {
      field: 'age',
      cellClassRules: {
        "rag-green": (params: any) => {
          const result = params.value < 20;
          return result;
        },
        "rag-blue": (params: any) => {
          const result = params.value >= 20 && params.value < 25;
          return result
        },
        "rag-red": (params: any) => {
          const result = params.value >= 25;
          return result
        }
      }
    },
    { field: 'country' },
    {
      field: 'year',
      cellClassRules: this.ragCellClassRules,
      cellRenderer: this.ragRenderer,
    },
    { field: 'sport', cellClass: this.cellClass, },
    { field: 'gold', cellStyle: { backgroundColor: "#aaffaa" } },
    { field: 'silver', cellStyle: this.cellStyle },
    { field: 'bronze', cellStyle: this.cellStyle },
    { field: 'total' }
  ];

  defaultColDef: ColDef = {
    width: 150,
    editable: true,
  };

  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
  };

  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params),

    onFirstDataRendered: (params: any) => {
      console.log('Grid data rendered');
    }
  };

  constructor(private combinedStyleService: CombinedStyleService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.combinedStyleService.getOlympicAthletes().subscribe({
      next: (data) => {
        console.log('Data received in component:', data);
        this.rowData = data;
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
  }


 }
