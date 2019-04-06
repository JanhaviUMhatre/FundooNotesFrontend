import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packagecard',
  templateUrl: './packagecard.component.html',
  styleUrls: ['./packagecard.component.scss']
})
export class PackagecardComponent implements OnInit {
  details: any;
  info: string;
  cartid: any;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private cart:CartService) { }

  ngOnInit() {
    this.getJson()
    this.cart.cards.subscribe(info => this.info = info)

  }
  getJson(){
    this.http.get(this.baseUrl+'user/service').subscribe(
      (Response)=>{console.log("success",Response);
      this.details=Response['data']['data']
      this.cartid=this.info['id']
      },
      (error)=>{console.log("error",error);
      }
    )
  }
}
