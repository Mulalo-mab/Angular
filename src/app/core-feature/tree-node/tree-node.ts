import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TreeNodeData {
  ShortDesc: string;
  GroupCode: string;
  GroupName: string;
  ID: number;
  ParentId: number | null;
  sequence: string;
}


@Component({
  selector: 'app-tree-node',
  standalone: false,
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.css'
})
export class TreeNode {
  private gridApi!: GridApi;


  rowData: TreeNodeData[] = [
    { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: 1049, sequence: "" },
    { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
    { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
    { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
    { ShortDesc: 'Arsenic (As) (SGS Vietnam)', GroupCode: 'Arsenic (As) (SGS Vietnam)', GroupName: 'Arsenic (As) (SGS Vietnam)', ID: 1362, ParentId: 639, sequence: "" },
    { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: 1049, sequence: "" },
    { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
    { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
    { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
    { ShortDesc: '(CEN) Salmonella spp. (RAPID Short Protocol)', GroupCode: '(CEN) Salmonella spp. (RAPID Short Protocol)', GroupName: '(CEN) Salmonella spp. (RAPID Short Protocol)', ID: 1173, ParentId: null, sequence: "" },
    { ShortDesc: 'Acidity (Fixed) in Wine', GroupCode: 'Acidity (Fixed) in Wine (Calculated ex Total & Volatile Acidity)', GroupName: 'Acidity (Fixed) in Wine (Calculated ex Total & Volatile Acidity)', ID: 173, ParentId: 1049, sequence: "" },
    { ShortDesc: 'Cd (ICP-MS)', GroupCode: 'Cadmium (Cd) (ICP-MS)', GroupName: 'Cadmium (Cd) (ICP-MS)', ID: 333, ParentId: 651, sequence: "" },
    { ShortDesc: 'Cd (ICP-MS)', GroupCode: 'Cadmium (Cd) (ICP-MS)', GroupName: 'Cadmium (Cd) (ICP-MS)', ID: 333, ParentId: 1025, sequence: "" },


    // data
   // {
   //   ParentId: 1049,
   //   children: [
   //     { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
   //     { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
   //     { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
   //     { ShortDesc: 'As (ICP-MS)', GroupCode: 'Arsenic (As) (ICP-MS)', GroupName: 'Arsenic (As) (ICP-MS)', ID: 332, ParentId: null, sequence: "" },
   //   ],
   // },
   // {
//ParentId: 639,
   //   children: [
    //    { ShortDesc: 'Arsenic (As) (SGS Vietnam)', GroupCode: 'Arsenic (As) (SGS Vietnam)', GroupName: 'Arsenic (As) (SGS Vietnam)', ID: 1362, ParentId: null, sequence: "" },
    //  ],
   // },
   // {
   //   ParentId: 1049,
   //   children: [
   //     { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
   //     { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
   //    { ShortDesc: 'Ash (Fishmeal)', GroupCode: 'Ash (Fishmeal)', GroupName: 'Ash (Fishmeal)', ID: 16, ParentId: null, sequence: "" },
   //   ]
  //  }
  ];


  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'ShortDesc', headerName: 'Short Description' },
    { field: 'GroupCode', headerName: 'Group Code' },
    { field: 'GroupName', headerName: 'Group Name' },
    { field: 'ID', headerName: 'ID' },
    { field: 'ParentId', headerName: 'Parent ID' },
    { field: 'sequence', headerName: 'Sequence' }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  }


  gridOptions = {
    theme: 'legacy' as any,
    onGridReady: (params: any) => this.onGridReady(params),
    groupHeaderHeight: undefined,
    headerHeight: undefined,
    floatingFiltersHeight: undefined
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    console.log('Grid ready, current rowData length:', this.rowData.length);

    if (this.rowData && this.rowData.length > 0) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

}
