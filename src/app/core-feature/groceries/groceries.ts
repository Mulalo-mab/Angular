import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { GroceriesService, TreeNodeData, FlatNode } from './groceries-service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

interface ChecklistNode extends TreeNodeData {
  checked?: boolean;
  children?: ChecklistNode[];
}

interface ChecklistFlatNode extends FlatNode {
 // checked?: boolean;
}

@Component({
  selector: 'app-groceries',
  standalone: false,
  templateUrl: './groceries.html',
  styleUrl: './groceries.css'
})
export class Groceries {

  checklistSelection = new SelectionModel<ChecklistFlatNode>(true);

  // adding the maps
  flatNodeMap = new Map<ChecklistFlatNode, ChecklistNode>();
  nestedNodeMap = new Map<ChecklistNode, ChecklistFlatNode >();

  treeData: ChecklistNode[] = [];
  private rawFlatData: TreeNodeData[] = [];

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

  treeControl = new FlatTreeControl<ChecklistFlatNode>(
    node => node.level,
    node => node.expandable
  );

  private _transformer = (node: ChecklistNode, level: number): ChecklistFlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode: ChecklistFlatNode = existingNode || {
      expandable: !!node.children && node.children.length > 0,
      GroupName: node.GroupName,
      level: level,
      ID: node.ID
    };

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

 

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

    this.checklistSelection.changed.subscribe(() => {
      this.updateGridData();
    })
  }

  hasChild = (_: number, node: ChecklistFlatNode) => node.expandable;

  private loadTreeData(): void {
    this.groceriesService.getTreeData().subscribe({
      next: (data: TreeNodeData[]) => {
        this.rawFlatData = data;
        this.treeData = this.buildTreeFromFlatData(data);
        this.dataSource.data = this.treeData;

        // expand all nodes
        this.treeControl.expandAll();
      },
      error: (error) => {
        console.error('Error loading tree data:', error);
      }
    });
  }

  private buildTreeFromFlatData(flatData: TreeNodeData[]): ChecklistNode[] {
    const nodeMap = new Map<number, ChecklistNode>();
    const roots: ChecklistNode[] = [];

    // first pass: create all nodes
    flatData.forEach(item => {
      nodeMap.set(item.ID, {
        ...item,
        children: []
      });
    });


    // second pass: build tree structure
    flatData.forEach(item => {
      const node = nodeMap.get(item.ID);
      if (node) {
        if (item.ParentID === 0) {
          roots.push(node);
        } else {
          const parent = nodeMap.get(item.ParentID);
          if (parent && parent.children) {
            parent.children.push(node);
          }
        }
      }
    });

    return roots;
  }

 //  Checkbox Logic using selectionModel

  // whether all descendants of a node are selected
  descendantsAllSelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
  }

  // whether part of the descendants are selected
  descendantsPartiallySelected(node: ChecklistFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  // Toggle the checklist selection for a node
  itemSelectionToggle(node: ChecklistFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);

    // Cascade selection to all descendants
    if (this.checklistSelection.isSelected(node)) {
      this.checklistSelection.select(...descendants);
    } else {
      this.checklistSelection.deselect(...descendants);
    }

    // force update the parent checked state
    this.checkAllParents(node);
  }

  // check all the parents of a node
  private checkAllParents(node: ChecklistFlatNode): void {
    let parent: ChecklistFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.descendantsAllSelected(parent)
        ? this.checklistSelection.select(parent)
        : this.checklistSelection.deselect(parent);

      parent = this.getParentNode(parent);
    }
  }

  // getParentNode remains the same , as it relies on the flat data array order
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
    return this.checklistSelection.selected;
  }

  // ----- Grid ----

  private updateGridData(): void {
    const selectedNodes = this.getSelectedNodes();

    if (selectedNodes.length === 0) {
      this.rowData = [];
      if (this.gridApi) {
        this.gridApi.setRowData(this.rowData);
      }
      return;
    }

    // Show all selected nodes
    this.rowData = selectedNodes.map(node => ({
      ID: node.ID,
      GroupName: node.GroupName,
      level: node.level,
      isLeaf: !node.expandable
    }));
   
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  // Remove item from grid (and deselect in tree)
  removeFromGrid(item: any): void {
    const treeNode = this.treeControl.dataNodes.find(node =>
      node.ID === item.ID && node.GroupName === item.GroupName
    );

    if (treeNode) {
      // deselect the node in tree
      this.checklistSelection.deselect(treeNode);

      if (treeNode.expandable) {
        const descendants = this.treeControl.getDescendants(treeNode);
        this.checklistSelection.deselect(...descendants);
      }
    }
  }

  onRowDoubleClicked(event: any): void {
    this.removeFromGrid(event.data);
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.updateGridData();
  }

  

  expandAll(): void {
    this.treeControl.expandAll();
  }

  collapseAll(): void {
    this.treeControl.collapseAll();
  }

}
