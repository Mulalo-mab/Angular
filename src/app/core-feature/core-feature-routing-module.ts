import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreFeature } from './core-feature';
import { ColumnFeature } from './column-feature/column-feature';
import { ColumnGroup } from './column-group/column-group';
import { CombinedStyle } from './combined-style/combined-style';
import { SortingComponent } from './sorting-component/sorting-component';

const routes: Routes = [
  {
    path: '', component: CoreFeature,
    children: [
      { path: '', redirectTo: 'columnFeature', pathMatch: 'full' },
      { path: 'column-feature', component: ColumnFeature },
      { path: 'column-group', component: ColumnGroup },
      { path: 'combined-style', component: CombinedStyle },
      { path: 'sorting', component: SortingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreFeatureRoutingModule { }
