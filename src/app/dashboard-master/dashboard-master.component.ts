import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-dashboard-master',
  templateUrl: './dashboard-master.component.html',
  styleUrls: ['./dashboard-master.component.css']
})
export class DashboardMasterComponent implements OnInit {

  title: string;
  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.title.subscribe(_title => {
      this.title = _title;
    });
  }

}
