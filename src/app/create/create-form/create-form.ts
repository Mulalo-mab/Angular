import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);


export interface User {
  id: number;
  name: string;
  location: string;
  money: number;
}


@Component({
  selector: 'app-create-form',
  standalone: false,
  templateUrl: './create-form.html',
  styleUrl: './create-form.css'
})
export class CreateForm implements OnInit {
 
  rowData = [
    { id: 1, name: 'Mulalo Mabuda', location: 'Kraaifontein', money: 300 },
    { id: 2, name: 'Lamla', location: 'Nyanga', money: 600 },
    { id: 3, name: 'Olwethu', location: 'Philippi', money: 900 },
    { id: 4, name: 'Karen', location: 'Bellville', money: 1200 },
  ];

  defaultColDef: ColDef = {
    flex: 1
  };

  colDefs: ColDef[] = [
    {
      field: "id",

    },
    { field: "name", },
    { field: "location", },
    {
      field: "money",
      valueFormatter: (p: any) => "R" + p.value.toLocaleString(),
    },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

};
