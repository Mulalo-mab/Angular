import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface TreeNodeData {
  ID: number;
  GroupName: string;
  ParentID: number;
  children?: TreeNodeData[];
}

export interface FlatNode {
  expandable: boolean;
  GroupName: string;
  level: number;
  ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  private apiUrl = 'assets/data/treedata.json';

  constructor(private http: HttpClient) { }

  getTreeData(): Observable<TreeNodeData[]> {
    // retrive the token from session
    const accessToken = sessionStorage.getItem('access_token');

    //create the httpHeaders
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + accessToken);

    // define the option object to pass the headers
    const options = { headers: headers };

    return this.http.get<TreeNodeData[]>(this.apiUrl);
  }
}
