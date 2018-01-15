import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { KitchenComponent } from './kitchen/kitchen.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    KitchenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
