import { Component, OnInit } from '@angular/core';
import { PackageselectComponent } from '../packageselect/packageselect.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  details: any;

  constructor(public dialog: MatDialog,private http: HttpClient) { }

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
    this.http.get("./assets/mydata.json").subscribe(
      (data)=>{console.log("success",data);
      this.details=data['details']
      }
    )
  }
}
