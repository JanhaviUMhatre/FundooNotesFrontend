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
  @ViewChild('dataTable') table;  // for jquery dataTable
 data: any[];
basic :number;
advance :number;
// userList=[];

  constructor(private svc : HttpService) { }
// jquery for dataTable
  ngOnInit() {
    this.getData()
    $(document).ready(function () {
      // $('#dtBasicExample').DataTable();
      $('.dataTables_length').addClass('bs-select');
      });
    
  }
  getData() {
    
    this.svc.getUserData().subscribe((response) => {
      
      console.log(response['data'].data);
      this.data = response['data'].data;
      var service = 'basic';
      var srvc = 'advance';
      //counting basic service registrations
      this.basic = this.data.filter((obj) => obj.service === service).length;
       //counting advance service registrations
      this.advance = this.data.filter((obj) => obj.service === srvc).length;
      console.log(this.basic);
      console.log(this.advance);
      
  
    },
    (error)=> {console.log("error",error)}  )
  }

  logout(){
    localStorage.removeItem('token')
  }
  }


