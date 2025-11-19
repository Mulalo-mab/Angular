import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { HelloWorldComponent } from './hello-world/hello-world-component/hello-world-component';
import { CounterComponent } from './counter/counter-component/counter-component';
import { BindingComponent } from './binding/binding-component/binding-component';
import { PipesComponent } from './pipes/pipes-component/pipes-component';
import { FormComponent } from './forms/form-component/form-component';
import { ReactiveFormsComp } from './reactive-forms/reactive-forms-comp/reactive-forms-comp';
import { CreateForm } from './create/create-form/create-form';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';
import { AgTable } from './ag-grid/ag-table/ag-table';
import { AgChartsModule } from 'ag-charts-angular';
import { AgChart } from './ag-charts/ag-chart/ag-chart';
import { PostComponent } from './post/post-component/post-component';
import { PostForm } from './post/post-component/post-form/post-form';



@NgModule({
  declarations: [
    App, 
    HelloWorldComponent,
    CounterComponent,
    BindingComponent,
    PipesComponent,
    FormComponent,
    CreateForm,
    AgTable,
    AgChart,
    PostComponent,
    ReactiveFormsComp,
    PostForm,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgGridAngular,
    AgGridModule,
    RouterModule,
    HttpClientModule,
    AgChartsModule,
    MatDialogModule,
    
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App] 
})
export class AppModule { }
