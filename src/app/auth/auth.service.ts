import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private tokenTimer: any;
  private token: string;
  private authencationStatusListener = new Subject<boolean>();
  public authenticatedUserIdListener = new Subject<string>();
  public isAthenticated = false;
  private userId: string;
  public username = new Subject<string>();
  private surname: string;
  private email: string;
  public name: string;
  private nameListener = new Subject<string>();
  private user: any;


  constructor(private http: HttpClient, private router: Router) {}

  //returns authentication status
  getIsAuth()
  {
    return this.isAthenticated;
  }

  getUserIdListener()
  {
    return this.authenticatedUserIdListener.asObservable();
  }

  getUserId()
  {
    return this.userId;
  }
  getToken()
  {
    return this.token;
  }
  getUsername()
  {
    this.username.subscribe(name => {
      this.name = name;
    });
  }

  getUsernameListener()
  {
      return this.nameListener.asObservable();
  }

  getName()
  {
    return this.name;
  }

  getEmail()
  {
    return this.email;
  }

  getSurname()
  {
    return this.surname;
  }

  //used to change status
  getAuthStatusListener() {
    return this.authencationStatusListener.asObservable();
  }

  getAuth(id: string)
  {
    return this.http.get("http://localhost:3000/api/user/getAuth/" + id);
  }

  createUser(name: string, surname: string, email: string, password: string)
  {

    //create user object
    const authData: AuthData = {
      name: name,
      surname: surname,
      email: email,
      password: password
    }

    //make post request to backend
    this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe(response => {
      this.router.navigate(['/auth/login']);
    },
    error => {
      this.authencationStatusListener.next(false);
    }
    )

  }

  //login method
  login(email: string, password: string)
  {
    const user: AuthData ={
      name: "",
      surname: "",
      email: email,
      password: password
    }

    this.http.post<{token: string, expiresIn: number,name: string, userId: string, surname: string, email: string}>("http://localhost:3000/api/user/login", user)
    .subscribe(response => {

      const token = response.token;

      if(token){
        const expiresInDuration = response.expiresIn;
        this.setTimerAuth(expiresInDuration);
        this.isAthenticated = true;
        this.authencationStatusListener.next(true);
        this.userId = response.userId;
        this.authenticatedUserIdListener.next(this.userId);
        // this.username.next(response.name);

        this.nameListener.next(response.name);
        this.name = response.name;

        this.name = response.name;
        this.surname = response.surname;
        this.email = response.email;
        //get expiration date
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);

        //store user data in local storage
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/dashboard/companyList']);

        this.token = response.token;
      }

    },
    error => {
      this.authencationStatusListener.next(false);
    }
    )
  }

  //method to data in local storage must be set to private
  private saveAuthData(token: string, expiresIn: Date, userId: string)
  {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toISOString());
    localStorage.setItem('userId', userId);
  }
  //method to clear user data in local storage
  clearUserData()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
  }

  //method to logout user
  logout() {
    //token set in login method
    this.token = null;
    //public property to check authetication
    this.isAthenticated = false;
    //property listener to check auth status
    this.authencationStatusListener.next(false);
    //navigate to login
    this.router.navigate(['/auth/login']);
    //clear user data in local storage
    this.clearUserData();

    //id of the authenticated user
    this.userId = null;
    // this.username.next('');
    // this.email.next('');
    // this.usersurname.next('');
    clearTimeout(this.tokenTimer);
  }

  //method to logout user if token duration expires
  setTimerAuth(duration)
  {
    this.tokenTimer = setTimeout(() => {
      this.logout();

    }, duration * 1000)
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');

    //if user is not authenticated return
    if(!token || !expirationDate)
    {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }

  }

  //
  autoAuthUser()
  {
    const authInformation = this.getAuthData();

    if(!authInformation)
    {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAthenticated = true;
      this.userId = authInformation.userId;
      this.setTimerAuth(expiresIn / 1000);
      this.authencationStatusListener.next(true);

      //get auth username
      this.getAuth(this.userId).subscribe(user => {
        this.user = user;
        this.nameListener.next(this.user.user.name);
        this.name = this.user.user.name;
      });


    }
  }
}
