import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-packagecard',
  templateUrl: './packagecard.component.html',
  styleUrls: ['./packagecard.component.scss']
})
export class PackagecardComponent implements OnInit {
  details: any;
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
}
