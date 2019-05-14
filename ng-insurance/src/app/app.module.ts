import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RcaComponent } from './components/rca/rca.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CategoryComponent } from './components/admin/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertyComponent } from './components/admin/property/property.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import {JwtInterceptor} from './helpers/jwt_interceptor/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error_interceptor/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AppComponent,
    RcaComponent,
    CategoryComponent,
    NotFoundComponent,
    PropertyComponent,
    AdminDashboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
