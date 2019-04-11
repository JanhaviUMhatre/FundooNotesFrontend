import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  baseUrl = environment.baseUrl;
  constructor(private user: HttpService) { }

  addtocart(userData) {
    return this.user.PostNormalMethod(this.baseUrl + 'productcarts/addToCart', userData)
  }
  placeorder(userData) {
    return this.user.postMethodJSON(this.baseUrl + 'productcarts/placeOrder', userData)
  }
  mycart() {
    return this.user.getForm(this.baseUrl + 'productcarts/myCart')
  }
}
