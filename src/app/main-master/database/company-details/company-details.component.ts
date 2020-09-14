import { IbinService } from 'src/app/ibin.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  private company: Company;
  private id: string;
  isLoading = false;
  name: string;
  ibin: string;
  founding_date: string;
  imagePath: string;
  website: string;
  email: string;
  domicile: string;

  constructor(private ibinService: IbinService, private headerService: HeaderService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.isLoading = true;
    this.route.paramMap.subscribe((paramap: ParamMap) => {

      if(paramap.has('id'))
      {
          this.id = paramap.get('id');
          this.ibinService.getCompany(this.id)
          .subscribe(company => {

            this.company = {
              id: company._id,
              email: company.email,
              name: company.name,
              website: company.website,
              ibin: company.ibin,
              domicile: company.domicile,
              founding_date: company.founding_date,
              imagePath: company.imagePath
            }

            this.email = this.company.email;
            this.name = this.company.name;
            this.ibin = this.company.ibin;
            this.website = this.company.website;
            this.founding_date = this.company.founding_date;
            this.imagePath = this.company.imagePath;
            this.domicile = this.company.domicile;

            this.isLoading = false;
            this.headerService.title.next(this.company.ibin);
          });

      }
    });
  }

}
