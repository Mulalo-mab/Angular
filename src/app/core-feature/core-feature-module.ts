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
import { ExternalDrop } from './external-drop/external-drop';
import { Filter } from './filter/filter';
import { Edit } from './edit/edit';
import { UpdateRow } from './update-row/update-row';
import { Buttons } from './buttons/buttons';


@NgModule({
  declarations: [
    CoreFeature,
    ColumnFeature,
    ColumnGroup,
    CombinedStyle,
    SortingComponent,
    ExternalDrop,
    Filter,
    Edit,
    UpdateRow,
    Buttons
  ],
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    CoreFeatureRoutingModule
  ]
})
export class CoreFeatureModule { }
