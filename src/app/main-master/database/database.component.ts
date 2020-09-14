import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';
import { Company } from 'src/app/company.model';
import { IbinService } from 'src/app/ibin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  public companies: Company[] = [];
  isLoading = false;

  constructor(private headerService: HeaderService, private ibinService: IbinService, private router: Router) { }

  ngOnInit() {
    this.headerService.title.next('DATABASE');
    this.isLoading = true;
    this.ibinService.getAllCompanies();
   this.ibinService.getCompanyUpdateListener()
   .subscribe((companiesData: Company[]) => {

      this.companies = companiesData;
      this.isLoading = false;
   });
  }

  onViewDetails(id: string)
  {
    this.router.navigateByUrl("/home/database/" + id)
  }

}
