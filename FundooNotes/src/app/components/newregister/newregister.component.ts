import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newregister',
  templateUrl: './newregister.component.html',
  styleUrls: ['./newregister.component.scss']
})
export class NewregisterComponent implements OnInit {
  details: any;
  servicemessage: any;
  @Output() messageEvent = new EventEmitter<string>();

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
  selectservice(service){
console.log("this is service",service)
this.servicemessage=service;
this.messageEvent.emit(this.servicemessage)

  }
}
