import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/admin/login/login.component';
import {CategoryComponent} from './components/admin/category/category.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CategoryPropertiesComponent} from './components/admin/category-properties/category-properties.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './guards/auth-guard/auth.guard';
import {Role} from './model/role/role.enum';
import {UserComponent} from './components/admin/user/user.component';
import {ProfileComponent} from './components/admin/profile/profile.component';
import {PropertyComponent} from './components/admin/property/property.component';
import {EditUserComponent} from './components/admin/user/edit-user/edit-user.component';
import {AddUserComponent} from './components/admin/user/add-user/add-user.component';
import {CategoryPropertiesResolverService} from './guards/category-properties-resolver/category-properties-resolver.service';
import {AdminDashboardResolverService} from './guards/admin-dashboard-resolver/admin-dashboard-resolver.service';
import {InsurancesComponent} from './components/admin/insurances/insurances.component';
import {HomeComponent} from './components/home/home.component';
import {InsuranceCalculatorComponent} from './components/insurance-calculator/insurance-calculator.component';
import {InsuranceCalculatorResolverService} from './guards/insurance-calculator-resolver/insurance-calculator-resolver.service';


const routes: Routes = [
  {
    path: 'main',
    component: HomeComponent,
    resolve: {
      insurances: InsuranceCalculatorResolverService
    }
  },
  {
    path: '',
    component: HomeComponent,
    resolve: {
      insurances: InsuranceCalculatorResolverService
    }
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      orders: AdminDashboardResolverService
    },
    data: {
      requiredRoles: [ Role.Moderator ]
    }
  },
  {
    path: 'admin/insurance/:id',
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
    path: 'admin/users/add',
    component: AddUserComponent,
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
    path: 'insurances/:name',
    component: InsuranceCalculatorComponent,
    resolve: {
      insurances: InsuranceCalculatorResolverService
    }
  },
  {
    path: 'admin/properties/:id',
    component: PropertyComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      categories: CategoryPropertiesResolverService
    },
    data: {
      requiredRoles: [ Role.Admin ]
    }
  },
  {
    path: 'admin/insurances',
    component: InsurancesComponent,
    canActivate: [ AuthGuard ],
    data: {
      requiredRoles: [ Role.Admin ]
    }
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
