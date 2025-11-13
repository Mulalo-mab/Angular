import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TreeNodeData {
  ShortDesc: string;
  GroupCode: string;
  GroupName: string;
  ID: number;
  ParentId: number | null;
  children?: TreeNodeData[];
}



@Injectable({
  providedIn: 'root'
})
export class NestedTreeService {
  private dataUrl = 'assets/data/tree-node.json';

  constructor(private http: HttpClient) { }

  getTreeData(): Observable<TreeNodeData[]> {
    return this.http.get<TreeNodeData[]>(this.dataUrl);
  }

  getNestedTreeData(): Observable<TreeNodeData[]> {
    return this.getTreeData().pipe(
      map(flatData => this.buildNestedTree(flatData))
    );
  }

  private buildNestedTree(flatData: TreeNodeData[]): TreeNodeData[] {
    const dataMap = new Map<number, TreeNodeData>();
    const treeData: TreeNodeData[] = [];

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
      } else if (item.ParentId === null) {
        treeData.push(dataMap.get(item.ID)!);
      }
    });
    return treeData;

  }


}
