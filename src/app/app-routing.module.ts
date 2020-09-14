import { AuthGuard } from './auth/auth.guard';
import { CompanyEditComponent } from './dashboard-master/company-list/company-detail/company-edit/company-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingMasterComponent } from './landing-master/landing-master.component';
import { MainMasterComponent } from './main-master/main-master.component';
import { AboutComponent } from './main-master/about/about.component';
import { ProcessComponent } from './main-master/process/process.component';
import { DatabaseComponent } from './main-master/database/database.component';
import { SupportComponent } from './main-master/support/support.component';
import { CompanyDetailsComponent } from './main-master/database/company-details/company-details.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CompanyListComponent } from './dashboard-master/company-list/company-list.component';
import { SecurityComponent } from './dashboard-master/security/security.component';
import { ContactComponent } from './dashboard-master/contact/contact.component';
import { DashboardMasterComponent } from './dashboard-master/dashboard-master.component';
import { CompanyDetailComponent } from './dashboard-master/company-list/company-detail/company-detail.component';
import { CreateCompanyComponent } from './dashboard-master/create-company/create-company.component';

const routes: Routes = [
  { path: '', component: LandingMasterComponent },
  { path: 'auth', component: AuthComponent, children: [
    {
      path: '',
      component: LoginComponent
    },
    {
          path: 'login',
          component: LoginComponent
    },
    {
          path: 'register',
          component: SignupComponent
    },
  ]},
  { path: 'dashboard', component: DashboardMasterComponent,canActivate: [AuthGuard], children: [
    {
      path: 'companyList',
      component: CompanyListComponent
    },
    {
          path: 'security',
          component: SecurityComponent
    },
    {
          path: 'contact',
          component: ContactComponent
    },
    {
      path: 'register',
      component: CreateCompanyComponent
    },
    {
      path: 'edit/:id',
      component: CompanyDetailComponent
},
{
    path: 'edit-details/:id',
    component: CompanyEditComponent
},
{
  path: '',
  redirectTo: '/dashboard/companyList',
  pathMatch: 'full'
}
  ]},
  { path: 'home', component: MainMasterComponent, children: [
    {
      path: '',
      component: AboutComponent
    },
    {
          path: 'about',
          component: AboutComponent
    },
    {
          path: 'process',
          component: ProcessComponent
    },
    {
          path: 'database',
          component: DatabaseComponent
    },
    {
      path: 'database/:id',
      component: CompanyDetailsComponent
    },
    {
          path: 'support',
          component: SupportComponent
    }
]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
