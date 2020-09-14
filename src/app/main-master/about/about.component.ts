
import { Component, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';

declare var $ : any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {



  constructor(private headerService: HeaderService) { }

   ngOnInit() {
    this.headerService.title.next('ABOUT');
  }



}
