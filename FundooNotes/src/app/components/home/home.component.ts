import { Component, OnInit } from '@angular/core';
import { PackageselectComponent } from '../packageselect/packageselect.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  details: any;
  productId: any;
  baseUrl = environment.baseUrl;
  productdetails: any;
  constructor(public dialog: MatDialog, private http: HttpClient, private cart: CartService, private carts: CartServiceService) { }

  ngOnInit() {

    this.getJson();
  }
  openDialoge() {
    const dialogRef = this.dialog.open(PackageselectComponent,{  });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  getJson() {
    this.http.get(this.baseUrl + 'user/service').subscribe(
      (Response) => {
        this.details = Response['data']['data']
      },
      (error) => {
      }
    )
  }

  sharevalues(card) {

    this.productId = card['id'];
    this.carts.addtocart({ "productId": this.productId }).subscribe(
      (response) => {
        this.productdetails = response['data']['details']['product']
        localStorage.setItem("serviceType", this.productdetails['name'])
        this.cart.sendinfocard(this.productdetails)
        localStorage.setItem("cartId", response['data']['details']['id'])
      },
      (error) => {
      }
    )

  }
}
