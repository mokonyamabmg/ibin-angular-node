import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { IbinService } from 'src/app/ibin.service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  company: Company;
  form: FormGroup;
  imagePreview: string;
  constructor(private ibinService: IbinService) { }

  ngOnInit() {
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


  onRegisterCompany()
  {
    if(this.form.invalid)
    {
      return;
    }

    this.ibinService.saveCompany(this.form.value.name, this.form.value.date, this.form.value.website,
       this.form.value.email, this.form.value.country, this.form.value.image);
    this.form.reset();
  }

}
