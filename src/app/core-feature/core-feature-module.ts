import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';


import { CoreFeatureRoutingModule } from './core-feature-routing-module';
import { CoreFeature } from './core-feature';
import { ColumnFeature } from './column-feature/column-feature';
import { ColumnGroup } from './column-group/column-group';
import { CombinedStyle } from './combined-style/combined-style';
import { SortingComponent } from './sorting-component/sorting-component';


@NgModule({
  declarations: [
    CoreFeature,
    ColumnFeature,
    ColumnGroup,
    CombinedStyle,
    SortingComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    CoreFeatureRoutingModule
  ]
})
export class CoreFeatureModule { }
