import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { HelloWorldComponent } from './hello-world/hello-world-component/hello-world-component';
import { CounterComponent } from './counter/counter-component/counter-component';
import { BindingComponent } from './binding/binding-component/binding-component';
import { PipesComponent } from './pipes/pipes-component/pipes-component';


@NgModule({
  declarations: [
    App, 
    HelloWorldComponent,
    CounterComponent,
    BindingComponent,
    PipesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App] 
})
export class AppModule { }
