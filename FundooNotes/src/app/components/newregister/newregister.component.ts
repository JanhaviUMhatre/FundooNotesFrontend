import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment';

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
  service: any;
  servicename: any;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private cart: CartService) { }

  ngOnInit() {
    this.getJson()
    this.cart.cards.subscribe(info => this.info = info)
  }

  getJson() {
    this.http.get(this.baseUrl + 'user/service').subscribe(
      (Response) => {
        this.details = Response['data']['data']
        this.cartid = this.info['id']
        this.servicename = this.info['name']
      },
      (error) => {
      }
    )

  }
  selectservice(service) {
    this.servicemessage = service;
    this.messageEvent.emit(this.servicemessage)

  }
}
