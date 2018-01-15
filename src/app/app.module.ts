import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { PredictComponent } from './predict/predict.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    KitchenComponent,
    PredictComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
