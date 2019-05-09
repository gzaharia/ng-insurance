import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RcaComponent} from './components/rca/rca.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: 'main',
    component: RcaComponent
  },
  {
    path: '',
    component: RcaComponent
  },
  {
    path:'admin/categories',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
