import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgChartsAngularModule } from 'ag-charts-angular';



import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AgCharts } from './ag-chart/ag-charts/ag-charts';

@NgModule({
  declarations: [
    App,
    AgCharts,
  ],
  imports: [
    BrowserModule,
    AgChartsAngularModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
