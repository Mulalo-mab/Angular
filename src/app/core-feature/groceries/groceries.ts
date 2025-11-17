import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GroceriesService, TreeNodeData, FlatNode } from './groceries-service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

interface ChecklistNode extends TreeNodeData {
  checked?: boolean;
  children?: ChecklistNode[];
}

interface ChecklistFlatNode extends FlatNode {
  checked?: boolean;
}

@Component({
  selector: 'app-groceries',
  standalone: false,
  templateUrl: './groceries.html',
  styleUrl: './groceries.css'
})
export class Groceries {

  treeData: ChecklistNode[] = [];

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

  rowSelection: "single" | "multiple" = "multiple";

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

  constructor(private groceriesService: GroceriesService) { }

  ngOnInit(): void {
    this.loadTreeData();
  }

  hasChild = (_: number, node: ChecklistFlatNode) => node.expandable;

  private loadTreeData(): void {
    this.groceriesService.getTreeDataWithHierarchy().subscribe({
      next: (treeData) => {
        this.treeData = this.initializeCheckedProperties(treeData);
        this.dataSource.data = this.treeData;
        console.log('Tree data loaded from service:', this.treeData);
      },
      error: (error) => {
        console.error('Error loading tree data:', error);
      }
    });
  }

  private initializeCheckedProperties(nodes: TreeNodeData[]): ChecklistNode[] {
    return nodes.map(node => ({
      ...node,
      checked: false,
      children: node.children ? this.initializeCheckedProperties(node.children) : undefined
    }));
  }

  descendantsAllSelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return child.checked;
    });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => child.checked);
    return result && !this.descendantsAllSelected(node);
  }

  itemSelectionToggle(node: ChecklistFlatNode): void {
    node.checked = !node.checked;
    this.toggleDescendants(node, node.checked);
    this.checkAllParents(node);
    this.updateGridData();
  }

  private toggleDescendants(node: ChecklistFlatNode, checked: boolean): void {
    const descendants = this.treeControl.getDescendants(node);
    descendants.forEach(child => {
      child.checked = checked;
    });
  }

  private checkAllParents(node: ChecklistFlatNode): void {
    let parent: ChecklistFlatNode | null = this.getParentNode(node);
    while (parent) {
      parent.checked = this.descendantsAllSelected(parent);
      parent = this.getParentNode(parent);
    }
  }

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

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
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
