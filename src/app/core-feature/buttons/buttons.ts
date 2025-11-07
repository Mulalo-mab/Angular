import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface Users {
  Edit?: string;
  ID: string;
  Name: string;
  Location: string;
  Money: string;
}

@Component({
  selector: 'app-buttons',
  standalone: false,
  templateUrl: './buttons.html',
  styleUrl: './buttons.css'
})
export class Buttons {

  rowData = [
    { Edit: '', Id: '1', Name: 'Mulalo', Location: 'Kraaifontein', Money: '50' }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  colDefs: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: () => {
        return `
          <button class="btn btn-sm edit-btn glyphicon"
              style="background-color: white; color: #337ab7; border: 1px solid #337ab7; border-radius: 0.25rem; cursor: pointer; transition: all 0.2s; padding: 0.15rem 0.5rem; position: relative; display: inline-block; font-family: 'Glyphicons Halflings'; font-style: normal; font-weight: normal; line-height: 1;">
            <i class="bi bi-pencil" style="color: #337ab7; position: relative; top: 1px;"></i>
</button>
`;
      },
     

    },
    { field: "ID" },
    { field: "Name" },
    { field: "Location" },
    {field: "Money"},
  ]

}
