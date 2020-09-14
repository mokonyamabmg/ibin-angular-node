import { Company } from './../../company.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';
import { IbinService } from 'src/app/ibin.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  constructor(private headerService: HeaderService, private ibinService: IbinService, private authService: AuthService) { }

  private companiesSub: Subscription;
  private authStatusSubs: Subscription;
  companies: Company[] = [];
  isLoading = false;

  ngOnInit() {
    this.headerService.title.next('COMPANIES');
    this.isLoading = true;
    this.ibinService.getAllCompaniesUser(this.authService.getUserId());
    this.companiesSub = this.ibinService.getCompanyUserUpdateListener()
    .subscribe(companiesData => {
      this.isLoading = false;
        this.companies = companiesData
    });
  }

ngOnDestroy() {
  this.companiesSub.unsubscribe();
}

}
