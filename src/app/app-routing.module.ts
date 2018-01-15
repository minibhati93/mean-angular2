import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { CreateComponent } from './create/create.component';
import { KitchenComponent } from './kitchen/kitchen.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/kitchen', pathMatch: 'full' },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'create', component: CreateComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}