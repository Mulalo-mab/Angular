import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { HelloWorldComponent } from './hello-world/hello-world-component/hello-world-component';
import { CounterComponent } from './counter/counter-component/counter-component';
import { BindingComponent } from './binding/binding-component/binding-component';
import { PipesComponent } from './pipes/pipes-component/pipes-component';
import { FormComponent } from './forms/form-component/form-component';
import { ReactiveFormsComp } from './reactive-forms/reactive-forms-comp/reactive-forms-comp';

@NgModule({
  declarations: [
    App, 
    HelloWorldComponent,
    CounterComponent,
    BindingComponent,
    PipesComponent,
    FormComponent,
    ReactiveFormsComp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App] 
})
export class AppModule { }
