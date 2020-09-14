import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private headerService: HeaderService, private authService: AuthService) { }

  ngOnInit() {
    this.headerService.title.next('ADMIN REGISTER');

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });

  }

  onSignup(form: NgForm)
  {
    let name = form.value.name;
    let surname = form.value.surname;
    let email = form.value.email;
    let password = form.value.password;

    if(form.invalid)
    {
      return;
    }

    this.isLoading = true;
    this.authService.createUser(name, surname, email, password);
  }

  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
}
