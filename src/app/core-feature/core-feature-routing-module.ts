import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { TreeNode } from './tree-node/tree-node';
import { FlatTree } from './flat-tree/flat-tree';
import { NestedTree } from './nested-tree/nested-tree';
import { Groceries } from './groceries/groceries';
import { Autocomplete } from './autocomplete/autocomplete';




const routes: Routes = [
  {
    path: '', component: CoreFeature,
    children: [
      { path: '', redirectTo: 'columnFeature', pathMatch: 'full' },
      { path: 'column-feature', component: ColumnFeature },
      { path: 'column-group', component: ColumnGroup },
      { path: 'combined-style', component: CombinedStyle },
      { path: 'sorting', component: SortingComponent },
      { path: 'external', component: ExternalDrop },
      { path: 'filter', component: Filter },
      { path: 'edit', component: Edit },
      { path: 'update', component: UpdateRow },
      { path: 'button', component: Buttons },
      { path: 'button/create', component: ButtonsForm },
      { path: 'button/edit/:id', component: ButtonsForm },
      { path: 'result', component: Result },
      { path: 'tree', component: TreeNode },
      { path: 'flat', component: FlatTree },
      { path: 'nested', component: NestedTree },
      { path: 'groceries', component: Groceries },
      { path: 'autocomplete', component: Autocomplete },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreFeatureRoutingModule { }
