import { Component, OnInit } from '@angular/core';
import { PackageselectComponent } from '../packageselect/packageselect.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http'; 
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  details: any;

  constructor(public dialog: MatDialog,private http: HttpClient,private cart:CartService) { }

  ngOnInit() {
    this.getJson();
  }
  openDialoge(){
    
      const dialogRef = this.dialog.open(PackageselectComponent,
        {
         
        });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
  
      });
    
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

  sharevalues(card){
    this.cart.sendinfocard(card)
  }
}
