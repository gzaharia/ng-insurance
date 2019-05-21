import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/admin/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';

import {RcaComponent} from './components/rca/rca.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoryComponent} from './components/admin/category/category.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CategoryPropertiesComponent} from './components/admin/category-properties/category-properties.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AdminComponent} from './components/admin/admin.component';
import {JwtInterceptor} from './helpers/jwt_interceptor/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error_interceptor/error.interceptor';
import {UserComponent} from './components/admin/user/user.component';
import {ProfileComponent} from './components/admin/profile/profile.component';
import {PropertyComponent} from './components/admin/property/property.component';
import {EditUserComponent} from './components/admin/user/edit-user/edit-user.component';
import {AddUserComponent} from './components/admin/user/add-user/add-user.component';
import {CategoryPropertiesResolverService} from './guards/category-properties-resolver/category-properties-resolver.service';
import {BasePriceComponent} from './components/admin/category/base-price/base-price.component';
import {InsurancesComponent} from './components/admin/insurances/insurances.component';
import {InsuranceHeaderComponent} from './components/admin/insurance-header/insurance-header.component';
import {AdminDashboardResolverService} from './guards/admin-dashboard-resolver/admin-dashboard-resolver.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AppComponent,
    RcaComponent,
    CategoryComponent,
    NotFoundComponent,
    CategoryPropertiesComponent,
    AdminDashboardComponent,
    AdminComponent,
    UserComponent,
    ProfileComponent,
    PropertyComponent,
    EditUserComponent,
    AddUserComponent,
    BasePriceComponent,
    InsurancesComponent,
    InsuranceHeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CategoryPropertiesResolverService,
    AdminDashboardResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
