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
      this.http.get('http://34.213.106.173/api/user/service').subscribe(
        (Response)=>{console.log("success",Response);
        this.details=Response['data']['data']
        },
        (error)=>{console.log("error",error);
        }
      )

  }
  selectservice(service){
console.log("this is service",service)
this.servicemessage=service;
this.messageEvent.emit(this.servicemessage)

  }
}
