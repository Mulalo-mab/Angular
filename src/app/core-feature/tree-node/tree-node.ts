import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeNodeService, TreeNodeData, FlatNode } from './tree-node-service';
import { ColDef, GridReadyEvent, RowSelectionOptions }from 'ag-grid-community';

interface ChecklistNode extends TreeNodeData {
  checked?: boolean;
  children?: ChecklistNode[];
}

interface ChecklistFlatNode extends FlatNode {
  checked?: boolean;
}

@Component({
  selector: 'app-tree-node',
  standalone: false,
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.css'
})
export class TreeNode implements OnInit {

  treeData: ChecklistNode[] = [];

  // ag-grid properties
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'GroupName', headerName: 'Group Name', rowDrag: true },
     {
      field: 'order',
      headerName: 'Order',
      width: 80,
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      sortable: false,
      filter: false,
      resizable: false
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
  };

  gridApi: any;

  private _transformer = (node: ChecklistNode, level: number): ChecklistFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      GroupName: node.GroupName,
      level: level,
      checked: node.checked || false,
      ID: node.ID,
    };
  };

  treeControl = new FlatTreeControl<ChecklistFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private treeNodeService: TreeNodeService) { }

  ngOnInit(): void {
    this.loadTreeData();
  }

  

  hasChild = (_: number, node: ChecklistFlatNode) => node.expandable;

  private loadTreeData(): void {
    this.treeNodeService.getTreeDataWithHierarchy().subscribe({
      next: (treeData) => {
        this.treeData = this.initializeCheckedProperties(treeData);
        this.dataSource.data = this.treeData;
        console.log('Tree data loaded from json:', this.treeData);
      },
      error: (error) => {
        console.error('Error loading tree data:', error);
      }
    });
  }

  private initializeCheckedProperties(node: TreeNodeData[]): ChecklistNode[] {
    return node.map(node => ({
      ...node,
      checked: false,
      children: node.children ? this.initializeCheckedProperties(node.children) : undefined
    }));
  }

  // selecting all the nodes
  descandantsAllSelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return child.checked;
    });
    return descAllSelected;
  }

  // Check if some descendants are selected
  descendantsPartiallySelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => child.checked);
    return result && !this.descandantsAllSelected(node);
  }

  // Toggle item selection
  itemSelectionToggle(node: ChecklistFlatNode): void {
    node.checked = !node.checked;
    this.toggleDescendants(node, node.checked);
    this.checkAllParents(node);
    this.updateGridData();
  }

  // Toggle all descendants
  private toggleDescendants(node: ChecklistFlatNode, checked: boolean): void {
    const descendants = this.treeControl.getDescendants(node);
    descendants.forEach(child => {
      child.checked = checked;
    });
  }

  // Check all parent nodes
  private checkAllParents(node: ChecklistFlatNode): void {
    let parent: ChecklistFlatNode | null = this.getParentNode(node);
    while (parent) {
      parent.checked = this.descandantsAllSelected(parent);
      parent = this.getParentNode(parent);
    }
  }

  // Get parent node
  private getParentNode(node: ChecklistFlatNode): ChecklistFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  // Get all selected nodes
  getSelectedNodes(): ChecklistFlatNode[] {
    return this.treeControl.dataNodes.filter(node => node.checked);
  }



  private updateGridData(): void {
    const selectedNodes = this.getSelectedNodes();
    this.rowData = selectedNodes.map(node => ({
      ID: node.ID,
      GroupName: node.GroupName,
      level: node.level
    }));

    // Refresh grid if API is available
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    // Auto-size columns to fit the grid width
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    });
  }

  expandAll(): void {
    this.treeControl.expandAll();
  }

  collapseAll(): void {
    this.treeControl.collapseAll();
  }
}
