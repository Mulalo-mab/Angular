import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeNodeService, TreeNodeData, FlatNode } from './tree-node-service';



@Component({
  selector: 'app-tree-node',
  standalone: false,
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.css'
})
export class TreeNode implements OnInit {
  
  treeData: TreeNodeData[] = [];

  private _transformer = (node: TreeNodeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      GroupName: node.GroupName,
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


  constructor(private treeNodeService: TreeNodeService) {
  }

  ngOnInit(): void {
    this.loadTreeData();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  private loadTreeData(): void {
    this.treeNodeService.getTreeDataWithHierarchy().subscribe({
      next: (treeData) => {
        this.treeData = treeData;
        this.dataSource.data = this.treeData;
        console.log('Tree data loaded from json:', this.treeData);
      },
      error: (error) => {
        console.error('Error loading tree data:', error);
      }
    });
  }

  expandAll(): void {
    this.treeControl.expandAll();
  }

  collapseAll(): void {
    this.treeControl.collapseAll();
  }

}
