import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  data: any;
 

  constructor(private svc : HttpService,private router: Router) { }

  ngOnInit() {
    this.getOrderData()
  }
  gotohome(){
    this.router.navigate(['/admindashboard']);
  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
  getOrderData(){
    this.svc.getDataorder().subscribe(
      (response)=>{console.log("success",response)
    this.data=response['data']
    
    console.log("--------data",this.data);
   
   
  
},
      (error)=>{console.log("error",error)}
    )
  }

  cancelorder(cartId){
this.svc.cancelor({"cartId":cartId}).subscribe(
  (response)=>{console.log("success",response);
  },
  (error)=>{console.log("error",error);
  }
)
  }
  completelorder(cartId){
    this.svc.cancelor({"cartId":cartId}).subscribe(
      (response)=>{console.log("success",response);
      },
      (error)=>{console.log("error",error);
      }
    )
      }
}
