import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/admin/login/login.component';
import {RcaComponent} from './components/rca/rca.component';
import {CategoryComponent} from './components/admin/category/category.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CategoryPropertiesComponent} from './components/admin/category-properties/category-properties.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './guards/auth-guard/auth.guard';
import {Role} from './model/role/role.enum';
import {UserComponent} from './components/admin/user/user.component';
import {ProfileComponent} from "./components/admin/profile/profile.component";
import {EditUserComponent} from "./components/admin/user/edit-user/edit-user.component";

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
    component: CategoryPropertiesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [ Role.Admin ]
    }
  },
  {
    path: 'admin/users',
    component: UserComponent,
    canActivate: [ AuthGuard ],
    data: {
      requiredRoles: [ Role.Admin ]
    }
  },
  {
    path: 'admin/users/:id',
    component: EditUserComponent,
    canActivate: [ AuthGuard ],
    data: {
      requiredRoles: [ Role.Admin ]
    }
  },
  {
    path: 'admin/profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ],
    data: {
      requiredRoles: [ Role.Moderator ]
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
