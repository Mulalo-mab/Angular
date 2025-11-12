import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { SelectionItem } from '../result-service'


export interface SelectionDialogData {
  currentEditingRow: any;
  selectionItems: SelectionItem[];
  selectionColDefs: ColDef[];
  selectionDefaultColDef: ColDef;
}

@Component({
  selector: 'app-selection-dialog-component',
  standalone: false,
  templateUrl: './selection-dialog-component.html',
  styleUrl: './selection-dialog-component.css'
})
export class SelectionDialogComponent {
  filteredSelectionItems: SelectionItem[] = [];
  selectedGridItem: SelectionItem | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectionDialogData
  ) {
    this.filteredSelectionItems = [...this.data.selectionItems]
  }

  onSearchFilterChange(filterValue: string) {
    console.log('Filtering:', filterValue);
    if (!filterValue.trim()) {
      this.filteredSelectionItems = [...this.data.selectionItems];
    } else {
      const filterLower = filterValue.toLowerCase().trim();
      this.filteredSelectionItems = this.data.selectionItems.filter(item =>
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
    if (this.selectedGridItem) {
      this.dialogRef.close(this.selectedGridItem);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
