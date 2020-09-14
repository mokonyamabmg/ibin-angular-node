import { Component, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';
import { HeaderService } from './header.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  private usernameSubs: Subscription;
  username: string;
  userIsAuthenticated = false;



  constructor(private headerService: HeaderService, private authService: AuthService) { }

  ngOnInit() {

    this.username = this.authService.name;
    this.usernameSubs = this.authService.getUsernameListener()
    .subscribe(username => {
      this.username = username;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }

  onLogout() {
    this.authService.logout();
  }

  onMenuClick()
  {
    this.headerService.menuOpenClose();
  }

  update(){
    this.headerService.menuOpenClose();
  }

ngOnDestroy()
{
  this.authListenerSubs.unsubscribe();
}
}
