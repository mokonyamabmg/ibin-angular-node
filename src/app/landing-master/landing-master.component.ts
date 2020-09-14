import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-master',
  templateUrl: './landing-master.component.html',
  styleUrls: ['./landing-master.component.css']
})
export class LandingMasterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginForm(form: NgForm)
  {

    let email = form.value.email;
    let password = form.value.password;

    if(form.invalid)
    {
      return;
    }

    this.authService.login(email, password);
  }
}
