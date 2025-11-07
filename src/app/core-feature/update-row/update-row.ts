import { Component } from '@angular/core';
import { ColDef, GridApi, RowSelectionOptions } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { UpdateRowService } from '../update-row/update-row-service';


ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-update-row',
  standalone: false,
  templateUrl: './update-row.html',
  styleUrl: './update-row.css',
})
export class UpdateRow {
  private gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { field: 'athlete', sortable: true, filter: false },
    { field: 'age', sortable: true, filter: false },
    { field: 'country', sortable: true, filter: false },
    { field: 'year', sortable: true, filter: false },
    { field: 'sport', sortable: true, filter: false },
   
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

  constructor(private updateRowService: UpdateRowService) { }

  ngOnInit(): void {
    this.loadData();

  };

  loadData(): void {
    this.updateRowService.getOlympicAthletes().subscribe({
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


  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "singleRow",
    checkboxes: false,
    enableClickSelection: true,
  }

  getRowData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });
    console.log("Row Data:");
    console.table(rowData);
  }

  clearData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });
    const res = this.gridApi.applyTransaction({
      remove: rowData,
    })!;
    this.printResult(res);
  }

  addItems(addIndex: number | undefined) {
    const newItems = [
      this.createNewRowData(),
      this.createNewRowData(),
      this.createNewRowData(),
    ];
    const res = this.gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    })!;
    this.printResult(res);
  }

  updateItems() {
    const itemsToUpdate: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort((node, index) => {
      if (index >= 2) {
        return;
      }
      const data = node.data;
      // data.country = data.country + ' ';
      data.country = data.country === data.country.toUpperCase()
        ? data.country
        : data.country.toUpperCase();
      itemsToUpdate.push(data);
    });
    const res = this.gridApi.applyTransaction({ update: itemsToUpdate })!;
    this.printResult(res);
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    this.printResult(res);
  }

  printResult(res: any) {
    console.log("----------------");

    if (res.add) {
      res.add.forEach((rowNode: any) => {
        console.log("Added row node", rowNode);
      });
    }


    if (res.remove) {
      res.remove.forEach(function (rowNode: any) {
        console.log("Remove row node", rowNode);
      })
    }

    if (res.update) {
      res.update.forEach((rowNode: any) => {
        console.log("Updated row node", rowNode);
      });
    }
  }

  private createNewRowData() {
    const countries = ['United States', 'United Kingdom', 'Russia', 'Australia', 'Canada', 'China'];

    const sports = ['Swimming', 'Athletics', 'Gymnastics', 'Cycling', 'Wrestling', 'Archery'];


    return {
      athlete: 'Mulalo Mabuda',
      age: Math.floor(Math.random() * 30) + 20,
      country: countries[Math.floor(Math.random() * countries.length)],
      year: 2024,
      sport: sports[Math.floor(Math.random() * sports.length)],
    }
  }

}
