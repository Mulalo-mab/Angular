import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ButtonsService, User } from './buttons-service';
import { Router } from '@angular/router';
import { GridOptions, RowSelectionOptions } from 'ag-grid-community';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);



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

  constructor(private buttonsService: ButtonsService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.buttonsService.getUsers().subscribe({
      next: (users) => {
        this.rowData = users;
        console.log('Users loaded successfully:', users);
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  openCreateForm() {
    console.log('Navigating to create form...');
    this.router.navigate(['/button/create']).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  onEditClick(userData: User): void {
    console.log('Edit clicked for user:', userData);
    console.log('Navigating to edit form with ID:', userData.Id);
    this.router.navigate(['/button/edit', userData.Id]).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  onFormSubmit(userData: User) {  // Make sure parameter is User type
    if (this.isEditMode) {
      this.buttonsService.updateUser(userData).subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        this.refreshData();
        this.showUserForm = false;
      });
    } else {
      this.buttonsService.addUser(userData).subscribe(newUser => {
        console.log('User created:', newUser);
        this.refreshData();
        this.showUserForm = false;
      });
    }
  }


  // Handle form cancellation
  onFormCancel() {
    this.showUserForm = false;
    this.selectedUser = null;
  }

  refreshData() {
    this.buttonsService.refreshData();
    this.loadUsers();
  }





  defaultColDef = {
    flex: 1,
    editable: true
  };

  colDefs: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: () => {
        return `
         <i class="material-icons" style="cursor: pointer; font-size: 24px; color: black;">edit</i>
`;
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
        precision: 2,
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
      }
    },
    {
      field: "Archaive",
      editable: false,
      cellRenderer: () => {
        return '<button class="btn btn-sm" style = "border-color: #17a2b8; background-color: #17a2b8; color: white; padding: 0.15rem 0.5rem;" > Archive </button>';
      },
      onCellClicked: (event: any) => {
        this.onArchiveClick(event.data)
      },
    },
    {
      field: "#",
      cellRenderer: () => {
        return `
          <i class="material-icons" style="cursor: pointer; font-size: 24px; color: black;">delete</i>
`;
      },
      onCellClicked: (event: any) => {
        this.onDeleteClick(event.data)
      }
    }
  ];

  

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
