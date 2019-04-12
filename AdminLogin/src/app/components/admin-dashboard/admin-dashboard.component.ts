// ***********************************************************************************
// * Purpose: Admin dashboard component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 11-2-2019
// *
// ***********************************************************************************
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

declare var $;
//import * as $ from 'jquery';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('dataTable') table;
  data: any[];
  basic: number;
  advance: number;


  constructor(private svc: HttpService) { }

  ngOnInit() {
    this.getData()
    $(document).ready(function () {

      $('.dataTables_length').addClass('bs-select');
    });

  }
  getData() {

    this.svc.getUserData().subscribe((response) => {
      this.data = response['data'].data;
      var service = 'basic';
      var srvc = 'advance';
      this.basic = this.data.filter((obj) => obj.service === service).length;
      this.advance = this.data.filter((obj) => obj.service === srvc).length;
    },
      (error) => { })
  }

  logout() {
    localStorage.removeItem('token')
  }
}


