import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RcaComponent} from './components/rca/rca.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertyComponent } from './components/property/property.component';

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
  },
  {
    path:'admin.category/{id}/properties',
    component: PropertyComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
