import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IbinService } from 'src/app/ibin.service';
import { Company } from 'src/app/company.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  private id: string;
  private company: Company;
  name: string;
  email: string;
  ibin: string;
  website: string;
  date_founded: string;
  imagePath: string;
  domicile: string;
  public username: string;
  public usersurname: string;
  public useremail: string;
  isLoading = false;

  constructor(public route: ActivatedRoute, private ibinService: IbinService, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
   this.route.paramMap.subscribe((paramap: ParamMap) => {

    if(paramap.has("id"))
    {
      this.id = paramap.get("id");
      this.ibinService.getCompany(this.id)
      .subscribe(companyData => {
        this.company = {
          id: companyData._id,
          name: companyData.name,
          email: companyData.email,
          website: companyData.website,
          ibin: companyData.ibin,
          domicile: companyData.domicile,
          founding_date: companyData.founding_date,
          imagePath: companyData.imagePath
        }
        this.name = this.company.name;
        this.email = this.company.email;
        this.ibin = this.company.ibin;
        this.domicile = this.company.domicile;
        this.date_founded = this.company.founding_date;
        this.imagePath = this.company.imagePath;
        this.website = this.company.website;

        const userId = this.authService.getUserId();

        this.authService.getAuth(userId).subscribe((user: any)  => {
          this.username = user.user.name;
          this.usersurname = user.user.surname;
          this.useremail = user.user.email;

        });

        this.isLoading = false;
      });

    }

   });

  }


  onEdit()
  {
    this.router.navigateByUrl("/dashboard/edit-details/" + this.id);
  }
}
