import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeService, TreeNodeData } from './nested-tree-service';

@Component({
  selector: 'app-nested-tree',
  standalone: false,
  templateUrl: './nested-tree.html',
  styleUrl: './nested-tree.css'
})
export class NestedTree implements OnInit {
  treeControl = new NestedTreeControl<TreeNodeData>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNodeData>();

  constructor(private nestedTreeService: NestedTreeService) { }

  ngOnInit(): void {
    this.loadTreeData();
  }

  hasChild = (_: number, node: TreeNodeData) =>
    !!node.children && node.children.length > 0;

  private loadTreeData(): void {
    this.nestedTreeService.getNestedTreeData().subscribe({
      next: (treeData) => {
        this.dataSource.data = treeData;
        console.log('Nested tree data loaded:', treeData);

        this.treeControl.dataNodes = treeData;
        this.treeControl.expandAll();
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


  getParentNodes(): TreeNodeData[] {
    return this.dataSource.data.filter(node => node.ParentId === null);
  }

  // Get children of a specific node
  getChildren(parentId: number): TreeNodeData[] {
    const findChildren = (nodes: TreeNodeData[]): TreeNodeData[] => {
      let children: TreeNodeData[] = [];
      nodes.forEach(node => {
        if (node.ID === parentId && node.children) {
          children = node.children;
        } else if (node.children) {
          children = children.concat(findChildren(node.children));
        }
      });
      return children;
    };

    return findChildren(this.dataSource.data);
  }



}
