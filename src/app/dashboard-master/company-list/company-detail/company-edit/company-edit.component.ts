import { mimeType } from './../../../create-company/mime-type.validator';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IbinService } from 'src/app/ibin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  isLoading = false;
  company: Company;
  form: FormGroup;
  imagePreview: string;
  id: string;

  constructor(private ibinService: IbinService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading= true;
    this.form = new FormGroup({
      name: new FormControl(null,
      {
        validators : [Validators.required, Validators.minLength(3)]
      }),
      date: new FormControl(null,
        {
          validators: [Validators.required]
        }),
        email: new FormControl(null,
          {
            validators: [Validators.email, Validators.required]
          }),
        website: new FormControl(null,
          {
            validators: [Validators.required, Validators.minLength(5)]
          }),
        country: new FormControl(null,
          {
            validators: [Validators.required]
          }),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })

    });

    this.route.paramMap.subscribe((paramap: ParamMap) => {

      if(paramap.has("id"))
      {
        this.id = paramap.get("id");
        this.ibinService.getCompany(this.id)
        .subscribe(companyData => {

          this.company = {
            id: companyData._id,
            name: companyData.name,
            website: companyData.website,
            email: companyData.email,
            domicile: companyData.domicile,
            imagePath: companyData.imagePath,
            founding_date: companyData.founding_date,
            ibin: companyData.ibin
          }

          this.form.setValue({
            name: this.company.name,
            country: this.company.domicile,
            email: this.company.email,
            website: this.company.website,
            date: this.company.founding_date,
            image: this.company.imagePath
          });

          this.isLoading = false;
        });
      }


    });


  }

  onImagePicked(event: Event){
    //typescript doesnt know the file attribute exists
    //you tell it by showing its going to be html type attribute
    const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({image: file});
    //this check if image is updated and if its valid
    this.form.get('image').updateValueAndValidity();

    //getting an image preview by returning a string of url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }


  onEditCompany()
  {
    if(this.form.invalid)
    {
      return;
    }

    this.ibinService.updateCompany(this.company.id,this.company.ibin, this.form.value.name, this.form.value.date, this.form.value.website,
       this.form.value.email, this.form.value.country, this.form.value.image);
    this.form.reset();
  }

}
