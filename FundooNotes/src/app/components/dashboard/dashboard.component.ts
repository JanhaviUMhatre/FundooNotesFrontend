// // ***********************************************************************************
// // * Purpose:Dashboard component.
// // *
// // * @author : Janhavi Mhatre
// // * @python version 3.7
// // * @platform : VS Code
// // * @since 6-2-2019
// // *
// // ***********************************************************************************

// import { Component, OnInit } from '@angular/core';

// import { LabelsComponent } from '../labels/labels.component';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { Router } from '@angular/router';
// import { NoteService } from 'src/app/services/notes/note.service';
// import { SearchService } from 'src/app/services/search/search.service';
// import { ViewService } from 'src/app/services/viewservice/view.service';
// import { ProfileComponent } from '../profile/profile.component';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   showFiller = false;
//   Search:any;
//   label:any;
//   flagnote:any;
//   icon:any = "view_stream";
//   data:any;
//   responsedata:Subscription;
//     labelId: any;
//     labelName: any;
//   constructor(private view: ViewService ,private svc :NoteService,public dialog: MatDialog,private router: Router,private ser : SearchService) { }

//   ngOnInit() {
//     this.getImage()
//     this.getLabelsDashboard()
//    // this.responsedata = this.view.loginResponse().subscribe(message =>  this.data = message);
//   }
//   openDialog(): void {
//     const dialogRef = this.dialog.open(ProfileComponent,
//      {
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
      
//     });
//   }
//   getImage(){
//       this.data=localStorage.getItem("imageUrl");
//   }
//   changeView(){
// if(this.icon === 'view_stream'){
//     this.icon = 'dashboard';
//  this.view.changeMessage('column wrap');
// }
// else{
//     this.icon='view_stream';
//     this.view.changeMessage('row wrap')
// }
//   }
//   openModal(templateRef) {
//     let dialogRef = this.dialog.open(templateRef, {
//         width: '250px',
//         // data: { name: this.name, animal: this.animal }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
        
//     });
// }
// openSearch(){
//     this.router.navigate(['/dashboard/search']);
// }
// lookFor(){
//         this.ser.changeMessage(this.Search);
// }
// changeprofile(){
//     this.router.navigateByUrl('/profile');
// }
// signout(){
//     localStorage.removeItem('token')
//     localStorage.removeItem('userId')
//     this.router.navigateByUrl('/login');
// }

// getLabelsDashboard(){
//     this.svc.getLabels().subscribe(
//         (response) => {console.log("success",response);
//         this.label=response['data']['details'];
//         console.log(this.label)
//     },
//         (error)=>{console.log("error",error)}
//     )
// }
// getIdlabel(labels){
//     this.labelId = labels.id
//     this.labelName = labels.label
//     console.log(this.labelId)

// }

// }
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LabelsComponent } from '../labels/labels.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/notes/note.service';
import { SearchService } from 'src/app/services/search/search.service';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { ProfileComponent } from '../profile/profile.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  baseUrl = environment.baseUrl;

  Search:any;
  label:any;
  flagnote:any;
  icon:any = "view_stream";
  data:any;
  responsedata:Subscription;
    labelId: any;
    labelName: any;
  constructor(private view: ViewService ,private svc :NoteService,public dialog: MatDialog,private router: Router,private ser : SearchService) { }

  ngOnInit() {
    this.getImage()
    this.getLabelsDashboard()
   // this.responsedata = this.view.loginResponse().subscribe(message =>  this.data = message);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileComponent,
     {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  getImage(){
      this.data=localStorage.getItem("imageUrl");
  }
  changeView(){
if(this.icon === 'view_stream'){
    this.icon = 'dashboard';
 this.view.changeMessage('column wrap');
}
else{
    this.icon='view_stream';
    this.view.changeMessage('row wrap')
}
  }
  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
        width: '250px',
        // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
    });
}
openSearch(){
    this.router.navigate(['/dashboard/search']);
}
lookFor(){
        this.ser.changeMessage(this.Search);
}
changeprofile(){
    this.router.navigateByUrl('/profile');
}
signout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigateByUrl('/login');
}

getLabelsDashboard(){
    this.svc.getLabels().subscribe(
        (response) => {console.log("success",response);
        this.label=response['data']['details'];
        console.log(this.label)
    },
        (error)=>{console.log("error",error)}
    )
}
getIdlabel(labels){
    this.labelId = labels.id
    this.labelName = labels.label
    console.log(this.labelId)

}
deletelabelforever(labels){
    this.svc.deletelabels(this.baseUrl+'noteLabels/'+labels.id+'/deleteNoteLabel').subscribe(
        (response)=>{console.log("success",response)},
        (error)=>{console.log("error",error)}
    )
}

}