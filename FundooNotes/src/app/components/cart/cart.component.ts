import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
isActive=false;
flag=false;
nextflag=false;
  info: string;
  price: any;
  name: any;
  description: any;
  constructor(private cart:CartService,private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cart.cards.subscribe(info => this.info = info)
    this.getInfocard()
  
  }
getInfocard(){
  this.price=this.info['price']
  this.name=this.info['name']
  this.description=this.info['description']
}
checkout(){
  this.flag=!this.flag
}
place(){
  this.nextflag=!this.nextflag
}
}
