import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { SelectionItem } from './result-service';
import { CommonModule } from '@angular/common';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface SelectionDialogData {
  currentEditingRow: any;
  selectionItems: SelectionItem[];
  selectionColDefs: ColDef[];
  selectionDefaultColDef: ColDef;
}

@Component({
  selector: 'app-selection-dialog',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  template: `
<div class="selection-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">
        <span>
          Selection for {{ data.currentEditingRow.athlete }} - {{ data.currentEditingRow.sport }}
        </span>
      </h5>
      <button type="button" class="close-btn" (click)="closeDialog()">&times;</button>
    </div>

    <div class="modal-body">
      <!-- Search Filter -->
      <div class="form-group">
        <label></label>
        <input type="text"
               class="form-control search-input"
               placeholder="Type to search..."
               #searchInput
               (input)="onSearchFilterChange(searchInput.value)">
      </div>

      <!-- AG-Grid for the list -->
      <div class="ag-grid-container">
        <ag-grid-angular class="ag-theme-alpine selection-grid"
                         [rowData]="filteredSelectionItems"
                         [columnDefs]="data.selectionColDefs"
                         [defaultColDef]="data.selectionDefaultColDef"
                         [rowSelection]="'single'"
                         (selectionChanged)="onSelectionChanged($event)"
                         (rowDoubleClicked)="onRowDoubleClicked($event)"
                         [suppressCellFocus]="true"
                         theme="legacy"
                         style="height: 300px; width: 100%;">
        </ag-grid-angular>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="closeDialog()">Close</button>
      <button type="button"
              class="btn btn-primary"
              (click)="confirmSelection()"
              [disabled]="!selectedGridItem">
        Select & Apply
      </button>
    </div>
  </div>
</div>
  `,
  styles: [`
    /* Keep all your existing modal CSS styles here */
    .selection-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1050;
      width: 80%;
      max-width: 800px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #dee2e6;
      background-color: #f8f9fa;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6c757d;
    }

    .close-btn:hover {
      color: #495057;
    }

    .modal-body {
      padding: 1.5rem;
      flex: 1;
      overflow: hidden;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #dee2e6;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .search-input {
      margin-bottom: 1rem;
    }

    .ag-grid-container {
      border: 1px solid #dee2e6;
      border-radius: 4px;
      overflow: hidden;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class SelectionDialogComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  filteredSelectionItems: SelectionItem[] = [];
  selectedGridItem: SelectionItem | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectionDialogData
  ) {
    this.filteredSelectionItems = [...this.data.selectionItems];
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
