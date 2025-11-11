import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Heroes } from './heroes/heroes';
import { FormsModule } from '@angular/forms';
import { HeroDetail } from './hero-detail/hero-detail';
import { MessagesComponent } from './messages/messages'; // <-- NgModel lives here


@NgModule({
  declarations: [
    App,
    Heroes, 
    HeroDetail,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
