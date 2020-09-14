import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: "root"})
export class IbinService {
  private code: any;
  private random: any;
  private ibin: any;

  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();
  private companiesUserUpdated = new Subject<Company[]>();


  constructor(private http: HttpClient, private router: Router) {}


  getAllCompanies() {
    this.http.get<{message: string, companies: any}>('http://localhost:3000/api/company')
    .pipe(
      map(companiesData => {
        return {companies: companiesData.companies.map(companies => {
          return {
            id: companies._id,
            name: companies.name,
            website: companies.website,
            email: companies.email,
            domicile: companies.domicile,
            imagePath: companies.imagePath,
            founding_date: companies.founding_date,
            ibin: companies.ibin,
            creator: companies.creator
          };

        })
      }
      })
    )
    .subscribe(transformedData => {
      this.companies = transformedData.companies;
      this.companiesUpdated.next(
        [...this.companies]
      )
    });
  }


  getAllCompaniesUser(id: string) {
    this.http.get<{message: string, companies: any}>('http://localhost:3000/api/company/User/' + id)
    .pipe(
      map(companiesData => {
        return {companies: companiesData.companies.map(companies => {
          return {
            id: companies._id,
            name: companies.name,
            website: companies.website,
            email: companies.email,
            domicile: companies.domicile,
            imagePath: companies.imagePath,
            founding_date: companies.founding_date,
            ibin: companies.ibin,
            creator: companies.creator
          };

        })
      }
      })
    )
    .subscribe(transformedData => {
      this.companies = transformedData.companies;
      this.companiesUserUpdated.next(
        [...this.companies]
      )
    });
  }

  getCompany(id: string)
  {
    return this.http.get<{_id: string, name: string, email: string, website: string, domicile: string, ibin: string,founding_date: string, imagePath: string}>(
      "http://localhost:3000/api/company/" + id);
  }

  // this.ibinService.updateCompany(this.company.id,this.company.ibin, this.form.value.name, this.form.value.date, this.form.value.website,
  //   this.form.value.email, this.form.value.country, this.form.value.image);

  updateCompany(id: string,ibin: string, name: string,founding_date: string, website: string, email: string, domicile: string, image: string | File)
  {

    let companyData: Company | FormData;
    if(typeof image === "object")
    {
      companyData = new FormData();
      companyData.append("id", id);
      companyData.append("name", name);
      companyData.append("email", email);
      companyData.append("website", website);
      companyData.append("domicile", domicile);
      companyData.append("ibin", ibin);
      companyData.append("image", image);
      companyData.append("founding_date", founding_date);

    }else{
      companyData = {
        id: id,
        name: name,
        website: website,
        email: email,
        founding_date: founding_date,
        ibin: ibin,
        imagePath: image,
        domicile: domicile
      }
    }

    this.http.put("http://localhost:3000/api/company/edit/" + id, companyData)
    .subscribe(response => {
        console.log(response);
    });

  }

  getCompanyUpdateListener()
  {
    return this.companiesUpdated.asObservable();
  }

  getCompanyUserUpdateListener()
  {
    return this.companiesUserUpdated.asObservable();
  }

  saveCompany(name: string, date: string, website: string, email: string, country: string, image: File)
  {
      const companyData = new FormData();
    // console.log(logo);

      this.code = this.getCountryCode(country);
      this.random = this.getRandom(10);
      this.ibin = this.getIbin(this.code, this.random);


      companyData.append("name", name);
      companyData.append("founding_date", date);
      companyData.append("email", email);
      companyData.append("website", website);
      companyData.append("domicile", country);
      companyData.append("ibin", this.ibin);
      companyData.append("image", image, name);

    this.http
    .post(
      "http://localhost:3000/api/company/create",
      companyData
    )
    .subscribe(responseData => {
      this.router.navigate(['/dashboard']);
    });
  }

  getCountryCode(country: string)
  {
    return country.substring(0, 2).toUpperCase();
  }

  getRandom(length: number) {

    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

  }

  getIbin(code: string, randomNumbers: number)
  {
    return code + randomNumbers + 'B'
  }
}
