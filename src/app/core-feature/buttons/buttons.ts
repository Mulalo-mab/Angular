import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ButtonsService, User, SelectionItem } from './buttons-service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-buttons',
  standalone: false,
  templateUrl: './buttons.html',
  styleUrl: './buttons.css'
})
export class Buttons implements OnInit {
  rowData: User[] = [];
  showUserForm: boolean = false;
  isEditMode: boolean = false;
  selectedUser: User | null = null;

  currentEditingRow: any = null;

  showSelectionModal: boolean = false;
  searchFilter: string = '';
  selectionItems: SelectionItem[] = [];
  filteredSelectionItems: SelectionItem[] = [];
  selectedGridItem: SelectionItem | null = null;

  selectionColDefs: any[] = [];
  selectionDefaultColDef: any = {};

  colDefs: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: () => {
        return `<i class="material-icons" style="cursor: pointer; font-size: 24px; color: black;">edit</i>`;
      },
      onCellClicked: (event: any) => {
        this.onEditClick(event.data);
      },
      maxWidth: 60,
      suppressSizeToFit: true,
      resizable: false,
    },
    {
      field: "Id",
      headerName: "ID",
      maxWidth: 150,
      editable: false,
    },
    {
      field: "Name",
      maxWidth: 200,
      filter: "agTextColumnFilter",
      editable: true
    },
    {
      field: "Location",
      maxWidth: 200,
      editable: true
    },
    {
      field: "age",
      headerName: "Age",
      maxWidth: 200,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        max: 100,
        precision: 0,
        step: 1,
        showStepperButtons: true
      },
      cellClassRules: {
        'rag-green': 'data.age < 25',
        'rag-blue': 'data.age >= 25 && data.age < 30',
        'rag-red': 'data.age >= 30',
      },
    },
    {
      field: "Money",
      maxWidth: 200,
      valueFormatter: params => 'R' + params.value,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        max: 100,
        precision: 0,
        step: 1,
        showStepperButtons: true
      }
    },
    {
      field: "Status",
      headerName: "Status",
      maxWidth: 200,
      editable: false,
      cellStyle: {'background-color': 'cyan' },
      valueGetter: (params: any) => {
        return params.data.Status || 'Not Selected';
      },
      cellRenderer: (params: any) => {
        const status = params.data.Status || 'Not Selected';
        return `${status}`;
      },
      onCellClicked: (event: any) => {
        this.currentEditingRow = event.data;
        this.openSelectionModal();
      }
    },
    {
      field: "Archive",
      editable: false,
      cellRenderer: () => {
        return '<button class="btn btn-sm" style="border-color: #17a2b8; background-color: #17a2b8; color: white; padding: 0.15rem 0.5rem;">Archive</button>';
      },
      onCellClicked: (event: any) => {
        this.onArchiveClick(event.data)
      },
    },
    {
      field: "Delete",
      cellRenderer: () => {
        return `<i class="material-icons" style="cursor: pointer; font-size: 24px; color: black;">delete</i>`;
      },
      onCellClicked: (event: any) => {
        this.onDeleteClick(event.data)
      }
    }
  ];

  defaultColDef = {
    flex: 1,
    editable: true
  };

  constructor(
    private buttonsService: ButtonsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectionColDefs = this.buttonsService.getSelectionColDefs();
    this.selectionDefaultColDef = this.buttonsService.getSelectionDefaultColDef();
    this.loadUsers();
  }

 
  openSelectionModal() {
    if (!this.currentEditingRow) {
      console.error('No row selected for editing');
      return;
    }

    const userAge = this.currentEditingRow.age;
    console.log(`Generating options for age: ${userAge}`);

    this.selectionItems = this.buttonsService.generateSelectionItemsBasedOnAge(userAge);
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
      const userId = this.currentEditingRow.Id;

      this.buttonsService.updateUserStatus(userId, selectedStatus).subscribe({
        next: (response) => {
          console.log('Status updated successfully:', response);
          alert(`Status updated to: ${selectedStatus}`);

          this.loadUsers();
        },
        error: (error) => {
          console.error('Error updating status:', error);
          alert('Error updating status. Please try again.');
        }
      });

      this.closeSelectionModal();
    }
  }

  // update user status in backend
  updateUserStatus(userId: string, status: string) {
    this.buttonsService.updateUserStatus(userId, status).subscribe({
      next: (response) => {
        console.log('Status updated in backend:', response);
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }

  loadUsers() {
    this.buttonsService.getUsers().subscribe({
      next: (users) => {
        // Initialize Status for each user if not exists
        this.rowData = users.map(user => ({
          ...user,
          Status: user.Status || 'Not Selected'
        }));
        console.log('Users loaded successfully:', users);
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  openCreateForm() {
    console.log('Navigating to create form...');
    this.router.navigate(['create'], { relativeTo: this.route }).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation failed:', error);
      this.router.navigate(['/button/create']).then(success => {
        console.log('Absolute navigation successful:', success);
      }).catch(error2 => {
        console.error('Absolute navigation also failed:', error2);
      });
    });
  }

  onEditClick(userData: User): void {
    console.log('Edit clicked for user:', userData);
    if (userData.Id) {
      this.router.navigate(['edit', userData.Id], { relativeTo: this.route }).then(success => {
        console.log('Navigation successful:', success);
      }).catch(error => {
        console.error('Navigation failed:', error);
        this.router.navigate(['/button/edit', userData.Id]).then(success => {
          console.log('Absolute navigation successful:', success);
        }).catch(error2 => {
          console.error('Absolute navigation also failed:', error2);
        });
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  onArchiveClick(userData: User): void {
    console.log('Archive clicked for user:', userData);
    if (confirm(`Are you sure you want to archive ${userData.Name}?`)) {
      this.buttonsService.archiveUser(userData.Id).subscribe(success => {
        if (success) {
          console.log(`User ${userData.Name} archived successfully`);
          this.rowData = this.rowData.filter(user => user.Id !== userData.Id);
        }
      });
    }
  }

  onDeleteClick(userData: User): void {
    console.log('Delete clicked for user:', userData);
    if (confirm(`Are you sure you want to permanently DELETE ${userData.Name}? This action cannot be undone.`)) {
      this.buttonsService.deleteUser(userData.Id).subscribe({
        next: (success) => {
          if (success) {
            console.log(`User ${userData.Name} deleted successfully`);
            this.rowData = this.rowData.filter(user => user.Id !== userData.Id);
            alert(`User ${userData.Name} has been deleted successfully.`);
          } else {
            console.error('Failed to delete user');
            alert('Failed to delete user. The user may have already been deleted.');
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('An error occurred while deleting the user. Please try again.');
        }
      });
    }
  }
}
