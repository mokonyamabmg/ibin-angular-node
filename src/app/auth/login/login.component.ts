import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private headerService: HeaderService, private authService: AuthService) { }

  ngOnInit() {
    this.headerService.title.next('ADMIN LOGIN');

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onLoginForm(form: NgForm)
  {

    let email = form.value.email;
    let password = form.value.password;

    if(form.invalid)
    {
      return;
    }
    this.isLoading = true;
    this.authService.login(email, password);
  }

  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
}
