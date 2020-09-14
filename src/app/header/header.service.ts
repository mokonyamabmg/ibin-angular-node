import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare var $ : any;

@Injectable({ providedIn: "root" })
export class HeaderService {

  title = new Subject<string>();



  menuOpenClose(){
      $("#menu-button").toggleClass("active");
      $("#line-1").toggleClass("active");
      $("#line-2").toggleClass("active");
      $("#line-3").toggleClass("active");
      $("#menu").slideToggle("slow");
  }

}
