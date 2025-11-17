import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface FoodNode {
  name: string;
  checked?: boolean
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fuit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          {name: 'Brussel spouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          {
            name: 'Carrots',
            children: [
              {name: 'Mulalo'}
            ]
          },
        ]
      },
    ]
  },
]


@Component({
  selector: 'app-nested-tree',
  standalone: false,
  templateUrl: './nested-tree.html',
  styleUrl: './nested-tree.css'
})
export class NestedTree implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.initializeCheckedProperties(TREE_DATA); this.dataSource.data = TREE_DATA;
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.treeControl.dataNodes = TREE_DATA;
    this.treeControl.expandAll();
  }

  private initializeCheckedProperties(node:FoodNode[]): void {
    node.forEach(node => {
      node.checked = node.checked || false;
      if (node.children) {
        this.initializeCheckedProperties(node.children);
      }
    });
  }

  // check if all descandants are selected
  descendantsAllSelected(node: FoodNode): boolean {
    if (!node.children) {
      return node.checked || false;
    }

    return node.children.length > 0 &&
      node.children.every(child => this.descendantsAllSelected(child));
  }

  descendantsPartiallySelected(node: FoodNode): boolean {
    if (!node.children) {
      return false;
    }

    const someSelected = node.children.some(child =>
      this.descendantsAllSelected(child) || this.descendantsPartiallySelected(child)
    );
    const allSelected = node.children.every(child => this.descendantsAllSelected(child));
    return someSelected && !allSelected;
  }


  itemSelectionToggle(node: FoodNode): void {
    node.checked = !node.checked;
    this.toggleDescendants(node, node.checked);
  }

  private toggleDescendants(node: FoodNode, checked: boolean): void {
    if (node.children) {
      node.children.forEach(child => {
        child.checked = checked;
        this.toggleDescendants(child, checked);
      });
    }
  }

  getSelectedNodes(): FoodNode[] {
    const selected: FoodNode[] = [];
    this.findSelectedNodes(this.dataSource.data, selected);
    return selected;
  }

  private findSelectedNodes(node: FoodNode[], selected: FoodNode[]): void {
    node.forEach(node => {
      if (node.checked) {
        selected.push(node);
      }
      if (node.children) {
        this.findSelectedNodes(node.children, selected);
      }
    });
  }

  // select all nodes
  selectAll(): void {
    this.toggleAll(this.dataSource.data, true);
  }

  deselectAll(): void {
    this.toggleAll(this.dataSource.data, false);
  }

  private toggleAll(node: FoodNode[], checked: boolean): void {
    node.forEach(node => {
    node.checked = checked;
    if (node.children) {
      this.toggleAll(node.children, checked);
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
