import { Component } from '@angular/core';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-column-feature',
  standalone: false,
  templateUrl: './column-feature.html',
  styleUrl: './column-feature.css',
})
export class ColumnFeature {

  rowData: any[] = [
    { athlete: 'Michael Phelps', age: 23, country: 'United States', year: 2008, sport: 'Swimming', gold: 8, silver: 0, bronze: 0, total: 8 },
    { athlete: 'Michael Phelps', age: 27, country: 'United States', year: 2012, sport: 'Swimming', gold: 4, silver: 2, bronze: 0, total: 6 },
    { athlete: 'Michael Phelps', age: 31, country: 'United States', year: 2016, sport: 'Swimming', gold: 5, silver: 1, bronze: 0, total: 6 },
    { athlete: 'Usain Bolt', age: 22, country: 'Jamaica', year: 2008, sport: 'Athletics', gold: 3, silver: 0, bronze: 0, total: 3 },
    { athlete: 'Usain Bolt', age: 26, country: 'Jamaica', year: 2012, sport: 'Athletics', gold: 3, silver: 0, bronze: 0, total: 3 },
    { athlete: 'Usain Bolt', age: 30, country: 'Jamaica', year: 2016, sport: 'Athletics', gold: 3, silver: 0, bronze: 0, total: 3 },
    { athlete: 'Simone Biles', age: 19, country: 'United States', year: 2016, sport: 'Gymnastics', gold: 4, silver: 0, bronze: 1, total: 5 },
    { athlete: 'Simone Biles', age: 24, country: 'United States', year: 2020, sport: 'Gymnastics', gold: 2, silver: 0, bronze: 2, total: 4 },
    { athlete: 'Katie Ledecky', age: 19, country: 'United States', year: 2016, sport: 'Swimming', gold: 4, silver: 1, bronze: 0, total: 5 },
    { athlete: 'Katie Ledecky', age: 23, country: 'United States', year: 2020, sport: 'Swimming', gold: 2, silver: 2, bronze: 0, total: 4 },
    { athlete: 'Larisa Latynina', age: 21, country: 'Soviet Union', year: 1956, sport: 'Gymnastics', gold: 4, silver: 1, bronze: 1, total: 6 },
    { athlete: 'Larisa Latynina', age: 25, country: 'Soviet Union', year: 1960, sport: 'Gymnastics', gold: 3, silver: 2, bronze: 1, total: 6 },
    { athlete: 'Larisa Latynina', age: 29, country: 'Soviet Union', year: 1964, sport: 'Gymnastics', gold: 2, silver: 2, bronze: 2, total: 6 },
    { athlete: 'Paavo Nurmi', age: 23, country: 'Finland', year: 1920, sport: 'Athletics', gold: 3, silver: 1, bronze: 0, total: 4 },
    { athlete: 'Paavo Nurmi', age: 27, country: 'Finland', year: 1924, sport: 'Athletics', gold: 5, silver: 0, bronze: 0, total: 5 },
    { athlete: 'Paavo Nurmi', age: 31, country: 'Finland', year: 1928, sport: 'Athletics', gold: 1, silver: 2, bronze: 0, total: 3 }
  ];

  columnDefs: any[] = [
    { field: 'athlete', sortable: true, filter: true },
    { field: 'age', sortable: true, filter: true },
    { field: 'country', sortable: true, filter: true },
    { field: 'year', sortable: true, filter: true },
    { field: 'sport', sortable: true, filter: true },
    { field: 'gold', sortable: true, filter: true },
    { field: 'silver', sortable: true, filter: true },
    { field: 'bronze', sortable: true, filter: true },
    { field: 'total', sortable: true, filter: true }
  ];

  defaultColDef: any = {
    width: 150,
    sortable: true,
    resizable: true,
    filter: true,
  };

  // Event Handlers
  onGridReady(event: any) {
    console.log("Grid Ready", event);
    event.api.sizeColumnsToFit();
  }

  onSortChanged(event: any) {
    console.log("Sort Changed", event);
  }

  onColumnResized(event: any) {
    console.log("Column Resized", event);
  }

  onColumnVisible(event: any) {
    console.log("Column Visible", event);
  }

  onColumnMoved(event: any) {
    console.log("Column Moved", event);
  }

  onColumnPinned(event: any) {
    console.log("Column Pinned", event);
  }

  // Button Actions
  onBtSortOn() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      if (colDef.field === "age") {
        return { ...colDef, sort: "desc" };
      }
      if (colDef.field === "athlete") {
        return { ...colDef, sort: "asc" };
      }
      return { ...colDef };
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtSortOff() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      const { sort, ...rest } = colDef;
      return rest;
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtWidthNarrow() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      if (colDef.field === "age" || colDef.field === "athlete") {
        return { ...colDef, width: 100 };
      }
      return { ...colDef };
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtWidthNormal() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      return { ...colDef, width: 150 };
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtHide() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      if (colDef.field === "age" || colDef.field === "athlete") {
        return { ...colDef, hide: true };
      }
      return { ...colDef };
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtShow() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      const { hide, ...rest } = colDef;
      return rest;
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtPinnedOn() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      if (colDef.field === "athlete") {
        return { ...colDef, pinned: "left" };
      }
      if (colDef.field === "sport") {
        return { ...colDef, pinned: "right" };
      }
      return { ...colDef };
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtPinnedOff() {
    const updatedColumnDefs = this.columnDefs.map((colDef: any) => {
      const { pinned, ...rest } = colDef;
      return rest;
    });
    this.columnDefs = [...updatedColumnDefs];
  }

  onBtReset() {
    this.columnDefs = [
      { field: 'athlete', sortable: true, filter: true },
      { field: 'age', sortable: true, filter: true },
      { field: 'country', sortable: true, filter: true },
      { field: 'year', sortable: true, filter: true },
      { field: 'sport', sortable: true, filter: true },
      { field: 'gold', sortable: true, filter: true },
      { field: 'silver', sortable: true, filter: true },
      { field: 'bronze', sortable: true, filter: true },
      { field: 'total', sortable: true, filter: true }
    ];
  }

  onBtAddRow() {
    const newRow = {
      athlete: 'New Athlete ' + (this.rowData.length + 1),
      age: Math.floor(Math.random() * 40) + 18,
      country: 'New Country',
      year: 2024,
      sport: 'New Sport',
      gold: Math.floor(Math.random() * 5),
      silver: Math.floor(Math.random() * 5),
      bronze: Math.floor(Math.random() * 5),
      total: 0
    };
    newRow.total = newRow.gold + newRow.silver + newRow.bronze;
    this.rowData = [...this.rowData, newRow];
  }

  onBtRemoveRow() {
    if (this.rowData.length > 0) {
      this.rowData = this.rowData.slice(1);
    }
  }

  onBtClearAll() {
    this.onBtSortOff();
    this.onBtShow();
    this.onBtPinnedOff();
    this.onBtWidthNormal();
  }
}
