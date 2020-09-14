
import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-main-master',
  templateUrl: './main-master.component.html',
  styleUrls: ['./main-master.component.css']
})
export class MainMasterComponent implements OnInit {

  title: string;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.title.subscribe(_title => {
      this.title = _title;
    });
  }

}
