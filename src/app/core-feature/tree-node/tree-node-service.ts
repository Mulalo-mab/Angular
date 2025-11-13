import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

export interface TreeNodeData {
  ShortDesc: string;
  GroupCode: string;
  GroupName: string;
  ID: number;
  ParentId: number | null;
  children?: TreeNodeData[];
}

export interface FlatNode {
  expandable: boolean;
  GroupName: string;
  level: number;
}


@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {
  private dataUrl = 'assets/data/tree-node.json';

  constructor(private http: HttpClient) { }

  getTreeData(): Observable<TreeNodeData[]> {
    return this.http.get<TreeNodeData[]>(this.dataUrl);
  }

  getTreeDataWithHierarchy(): Observable<TreeNodeData[]> {
    return this.getTreeData().pipe(
      map(flatData => this.convertToTreeStructure(flatData))
    );
  }

  // getting tree data by parentId
  getChildrenByParentId(parentId: number): Observable<TreeNodeData[]> {
    return this.getTreeData().pipe(
      map(flatData => flatData.filter(item => item.ParentId === parentId))
    );
  }

  //converting flat to structure
  convertToTreeStructure(flatData: TreeNodeData[]): TreeNodeData[] {
    const dataMap = new Map<number, TreeNodeData>();

    flatData.forEach(item => {
      dataMap.set(item.ID, {
        ...item,
        children: []
      });
    });

    flatData.forEach(item => {
      if (item.ParentId !== null && dataMap.has(item.ParentId)) {
        const parent = dataMap.get(item.ParentId);
        const child = dataMap.get(item.ID);
        if (parent && child) {
          parent.children!.push(child);
        }
      }
    });

    const treeData: TreeNodeData[] = [];
    flatData.forEach(item => {
      const node = dataMap.get(item.ID);
      if (item.ParentId === null && node) {
        treeData.push(node);
      }
    });
    return treeData;
  }


 

}
