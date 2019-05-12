import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import {RcaComponent} from './components/rca/rca.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertyComponent } from './components/admin/property/property.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';

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
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'admin/categories',
    component: CategoryComponent
  },
  {
    path: 'admin/category/:id',
    component: PropertyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
