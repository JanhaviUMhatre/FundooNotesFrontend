import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-newregister',
  templateUrl: './newregister.component.html',
  styleUrls: ['./newregister.component.scss']
})
export class NewregisterComponent implements OnInit {
  details: any;
  servicemessage: any;
  @Output() messageEvent = new EventEmitter<string>();
  info: string;
  cartid: any;

  constructor(private http: HttpClient, private cart:CartService) { }

  ngOnInit() {
    this.getJson()
    this.cart.cards.subscribe(info => this.info = info)
  }

    getJson(){
      this.http.get('http://34.213.106.173/api/user/service').subscribe(
        (Response)=>{console.log("success",Response);
        this.details=Response['data']['data']
        this.cartid=this.info['id']
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
