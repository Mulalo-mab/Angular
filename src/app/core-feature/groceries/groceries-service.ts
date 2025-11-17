import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TreeNodeData {
  ID: number;
  GroupName: string;
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

  private mockTreeData: TreeNodeData[] = [
    {
      ID: 1,
      GroupName: 'Groceries',
      children: [
        {
          ID: 2,
          GroupName: 'Almond Meal flour',
        },
        {
          ID: 3,
          GroupName: 'Organic eggs',
        },
        {
          ID: 4,
          GroupName: 'Protein Powder',
        },
        {
          ID: 5,
          GroupName: 'Fruits',
          children: [
            {
              ID: 6,
              GroupName: 'Apple',
            },
            {
              ID: 7,
              GroupName: 'Berries',
              children: [
                {
                  ID: 8,
                  GroupName: 'Blueberry',
                },
                {
                  ID: 9,
                  GroupName: 'Raspberry',
                },
              ],
            },
            {
              ID: 10,
              GroupName: 'Orange',
            },
          ],
        },
      ],
    },
    {
      ID: 11,
      GroupName: 'Reminders',
      children: [
        {
          ID: 12,
          GroupName: 'Cook dinner',
        },
        {
          ID: 13,
          GroupName: 'Read the Material Design spec',
        },
        {
          ID: 14,
          GroupName: 'Upgrade Application to Angular',
        },
      ],
    },
  ];

  constructor() { }

  getTreeDataWithHierarchy(): Observable<TreeNodeData[]> {
    return of(this.mockTreeData);
  }
}
