import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface CompanyNode {
  Name: string;
  Department: string;
  EmployeeCount: number;
  ID: number;
  ParentId: number | null;
  children?: CompanyNode[];
}


interface FlatNode {
  expandable: boolean;
  Name: string;
  Department: string;
  EmployeeCount: number;
  ID: number;
  ParentId: number | null;
  level: number;
}


@Component({
  selector: 'app-flat-tree',
  standalone: false,
  templateUrl: './flat-tree.html',
  styleUrl: './flat-tree.css'
})
export class FlatTree {
  private flatData: CompanyNode[] = [
    // Parent Nodes (ParentId: null) - These are the main departments
    { Name: 'CEO Office', Department: 'Executive', EmployeeCount: 5, ID: 1, ParentId: null },
    { Name: 'IT Department', Department: 'Technology', EmployeeCount: 25, ID: 2, ParentId: null },
    { Name: 'HR Department', Department: 'Human Resources', EmployeeCount: 8, ID: 3, ParentId: null },

    // Children of IT Department (ParentId: 2)
    { Name: 'Web Development Team', Department: 'Technology', EmployeeCount: 10, ID: 4, ParentId: 2 },
    { Name: 'Mobile Development Team', Department: 'Technology', EmployeeCount: 8, ID: 5, ParentId: 2 },
    { Name: 'Infrastructure Team', Department: 'Technology', EmployeeCount: 7, ID: 6, ParentId: 2 },

    // Children of HR Department (ParentId: 3)
    { Name: 'Recruitment Team', Department: 'Human Resources', EmployeeCount: 4, ID: 7, ParentId: 3 },
    { Name: 'Training Team', Department: 'Human Resources', EmployeeCount: 4, ID: 8, ParentId: 3 },
  ];

  // Tree structure for Material Tree
  treeData: CompanyNode[] = [];

  private _transformer = (node: CompanyNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Name: node.Name,
      Department: node.Department,
      EmployeeCount: node.EmployeeCount,
      ID: node.ID,
      ParentId: node.ParentId,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
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

  constructor() {
    this.convertToTreeStructure();
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  // Convert flat data to tree structure
  private convertToTreeStructure() {
    // Create a map for quick lookup
    const dataMap = new Map<number, CompanyNode>();

    // First pass: create all nodes with children array
    this.flatData.forEach(item => {
      dataMap.set(item.ID, {
        ...item,
        children: []
      });
    });

    // Second pass: build parent-child relationships
    this.flatData.forEach(item => {
      if (item.ParentId !== null && dataMap.has(item.ParentId)) {
        const parent = dataMap.get(item.ParentId);
        const child = dataMap.get(item.ID);
        if (parent && child) {
          parent.children!.push(child);
        }
      }
    });

    // Third pass: collect root nodes (nodes with no parent or parent not in data)
    this.treeData = [];
    this.flatData.forEach(item => {
      const node = dataMap.get(item.ID);
      if (item.ParentId === null) {
        this.treeData.push(node!);
      }
    });

    console.log('Tree data structure:', this.treeData);
  }

  // Expand all nodes
  expandAll(): void {
    this.treeControl.expandAll();
  }

  // Collapse all nodes
  collapseAll(): void {
    this.treeControl.collapseAll();
  }

  // Explain the structure
  explainStructure(): void {
    console.log('=== COMPANY STRUCTURE EXPLANATION ===');

    this.flatData.forEach(item => {
      if (item.ParentId === null) {
        console.log(`PARENT: "${item.Name}" (ID: ${item.ID}) - This is a root department`);
      } else {
        const parent = this.flatData.find(p => p.ID === item.ParentId);
        console.log(`CHILD: "${item.Name}" → Parent: "${parent?.Name}" (ParentId: ${item.ParentId})`);
      }
    });
  }

}
