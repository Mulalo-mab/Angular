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
      { path: 'result', component: Result},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreFeatureRoutingModule { }
