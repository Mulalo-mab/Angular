import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  checked?: boolean;
  ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {

  private apiUrl = 'assets/data/tree-node.json';
 

  constructor(private http: HttpClient) { }

  getTreeData(): Observable<TreeNodeData[]> {
    const accessToken = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + accessToken);
    const options = { headers: headers };

    return this.http.get<TreeNodeData[]>(this.apiUrl);
  }

 
}
