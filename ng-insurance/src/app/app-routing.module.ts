import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/admin/login/login.component';
import {RcaComponent} from './components/rca/rca.component';
import {CategoryComponent} from './components/admin/category/category.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PropertyComponent} from './components/admin/property/property.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './guards/auth-guard/auth.guard';
import {Role} from './model/role/role.enum';

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
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [ Role.Moderator ]
    }
  },
  {
    path: 'admin/categories',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [ Role.Admin ]
    }
  },
  {
    path: 'admin/category/:id',
    component: PropertyComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [ Role.Admin ]
    }
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
