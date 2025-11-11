import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgCharts } from './ag-chart/ag-charts/ag-charts';




const routes: Routes = [
  { path: 'agcharts', component: AgCharts}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
