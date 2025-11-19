import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
import { ButtonsForm } from './buttons/buttons-form/buttons-form';
import { Result } from './result/result';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionDialogComponent } from './result/selection-dialog-component/selection-dialog-component';
import { TreeNode } from './tree-node/tree-node';
import { FlatTree } from './flat-tree/flat-tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NestedTree } from './nested-tree/nested-tree';
import { Groceries } from './groceries/groceries';
import { Autocomplete } from './autocomplete/autocomplete';

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
    Buttons,
    ButtonsForm,
    Result,
    SelectionDialogComponent,
    TreeNode,
    FlatTree,
    NestedTree,
    Groceries,
    Autocomplete
  ],
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSlideToggleModule,
    CoreFeatureRoutingModule
  ]
})
export class CoreFeatureModule { }
