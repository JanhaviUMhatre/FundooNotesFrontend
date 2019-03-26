import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit {
  details: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJson()
  }
  getJson(){
    this.http.get("./assets/mydata.json").subscribe(
      (data)=>{console.log("success",data);
      this.details=data['details']
      }
    )
  }
}
