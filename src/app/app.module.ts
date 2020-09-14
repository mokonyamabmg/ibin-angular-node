import { ErrorInterceptor } from './error-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule, MatDialogModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMasterComponent } from './main-master/main-master.component';
import { LandingMasterComponent } from './landing-master/landing-master.component';
import { DashboardMasterComponent } from './dashboard-master/dashboard-master.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './main-master/about/about.component';
import { ProcessComponent } from './main-master/process/process.component';
import { DatabaseComponent } from './main-master/database/database.component';
import { SupportComponent } from './main-master/support/support.component';
import { CompanyListComponent } from './dashboard-master/company-list/company-list.component';
import { SecurityComponent } from './dashboard-master/security/security.component';
import { ContactComponent } from './dashboard-master/contact/contact.component';
import { CompanyDetailsComponent } from './main-master/database/company-details/company-details.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CompanyDetailComponent } from './dashboard-master/company-list/company-detail/company-detail.component';
import { CreateCompanyComponent } from './dashboard-master/create-company/create-company.component';
import { MyDatePickerModule } from 'mydatepicker';
import { CompanyEditComponent } from './dashboard-master/company-list/company-detail/company-edit/company-edit.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorComponent } from './error/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainMasterComponent,
    LandingMasterComponent,
    DashboardMasterComponent,
    LoginComponent,
    AboutComponent,
    ProcessComponent,
    DatabaseComponent,
    SupportComponent,
    CompanyListComponent,
    SecurityComponent,
    ContactComponent,
    CompanyDetailsComponent,
    AuthComponent,
    SignupComponent,
    CompanyDetailComponent,
    CreateCompanyComponent,
    CompanyEditComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
