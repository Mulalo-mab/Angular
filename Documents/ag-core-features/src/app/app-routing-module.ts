import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnFeature } from './core-features/column-feature/column-feature';

const routes: Routes = [
  { path: '', component: ColumnFeature }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
