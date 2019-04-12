import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isActive = false;
  flag = false;
  nextflag = false;
  info: string;
  price: any;
  name: any;
  description: any;
  address = new FormControl('', [Validators.required])
  cartId: string;
  placeorderData: { "cartId": string; "address": any; };
  status: any;
  cartpack: any;
  constructor(private cart: CartService, private _formBuilder: FormBuilder, private cartser: CartServiceService) { }

  ngOnInit() {

    this.cart.cards.subscribe(info => this.info = info)


    this.callmycart()
  }
  checkout() {
    this.flag = !this.flag
  }
  place() {

    this.cartId = localStorage.getItem('cartId')
    this.placeorderData = { "cartId": this.cartId, "address": this.address.value }
    this.cartser.placeorder(this.placeorderData).subscribe(
      (response) => {

        this.nextflag = !this.nextflag
      },
      (error) => {
      }
    )
  }
  callmycart() {
    this.cartser.mycart().subscribe(
      (Response) => {
        this.cartpack = Response['data']
        for (let i of Response['data']) {
          this.status = i.status
          this.price = i.price
          this.name = i.product.name
          this.description = i.product.description


        }
      },
      (error) => {
      }
    )
  }
}
