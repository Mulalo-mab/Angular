import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CustomerEdit } from './customers/customer-edit/customer-edit';
import { CustomerList } from './customers/customer-list/customer-list';

@NgModule({
  declarations: [
    App,
    CustomerEdit,
    CustomerList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
