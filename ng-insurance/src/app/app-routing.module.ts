import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RcaComponent} from './components/rca/rca.component';

const routes: Routes = [
  {
    path: 'main',
    component: RcaComponent
  },
  {
    path: '',
    component: RcaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
