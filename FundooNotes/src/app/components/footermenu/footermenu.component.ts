// ***********************************************************************************
// * Purpose: footer menu component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 15-2-2019
// *
// ***********************************************************************************
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateNote } from 'src/app/models/createnote.model';
import { NoteService } from 'src/app/services/notes/note.service';
import { FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { Router, Route } from '@angular/router'
import { QuestionService } from 'src/app/services/question/question.service';


@Component({
  selector: 'app-footermenu',
  templateUrl: './footermenu.component.html',
  styleUrls: ['./footermenu.component.scss']
})
export class FootermenuComponent implements OnInit {
  labels = new FormControl('')
  baseUrl = environment.baseUrl;


  @Input() data: any;
  archiveData: { "isArchived": any; "noteIdList": any[]; };
  colorCode: Array<Object> = [
    { name: "white", colorCode: "#fff" },
    { name: "red", colorCode: "#fc8981" },
    { name: "orange", colorCode: "#ffb834" },
    { name: "yellow", colorCode: "#fff181" },
    { name: "green", colorCode: "#c5fd98" },
    { name: "teal", colorCode: "#96ffec" },
    { name: "blue", colorCode: "#c4f0f7" },
    { name: "darkblue", colorCode: "#a6cbf7" },
    { name: "purple", colorCode: "#d9aff7" },
    { name: "pink", colorCode: "#ffcee6" },
    { name: "brown", colorCode: "#e9c7a9" },
    { name: "gray", colorCode: "#e7e9ec" }
  ]
  ColorData: { "color": any; "noteIdList": any[]; };
  label: any;
  addlabeldata: { "label": any; "userId": any; "isDeleted": any; };
  labelresponse: any;
  deletevalue: boolean;
  deleteData: { "isDeleted": boolean; "noteIdList": any[]; };
  addlabel: { "noteId": any; "lableId": any; };
  time = new FormControl('')
  date=new FormControl('')
  datanote: any;
  remindData: { "reminder": any[]; "noteIdList": any[]; };
  constructor( private snackBar: MatSnackBar,private que: QuestionService, private router: Router, public dialog: MatDialog, private svc: NoteService, private http: HttpClient) { }


  ngOnInit() {
    this.getLabelsDashboard()
 
  }
  openDialogCollaborate(): void {
    const dialogRef = this.dialog.open(CollaboratorComponent,
      {
        data: {
          noteId: this.data.id,
          email: this.data.user.email,
          id: this.data.user.id,
          firstName: this.data.user.firstName,
          lastName: this.data.user.lastName,
          userId: this.data.user.userId,

        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  gotoquestion() {
    console.log("clicked");

    // this.router.navigate(['/questions'])
    this.que.changeMessage(this.data.title)
    this.que.changeMessageD(this.data.description)
    this.que.changeMessageArray(this.data.id)
  }
  archive() {
    console.log(this.data.title)
    console.log(this.data.isArchived)
    this.data.isArchived = !this.data.isArchived
    console.log(this.data.isArchived);
    this.archiveData = {
      "isArchived": this.data.isArchived,
      "noteIdList": [this.data.id]
    }
    console.log(this.archiveData);
    this.svc.archivednote(this.archiveData).subscribe(
      (response) => {
        console.log("success", response);

      },
      (error) => { console.log("error", error); }
    )
  }

  changeColor(color) {
    console.log(color, this.data.color)
    this.ColorData = {
      "color": color,
      "noteIdList": [this.data.id]
    }
    console.log(this.ColorData)
    this.svc.colornote(this.ColorData).subscribe(
      (response) => {
        console.log("success", response);
      },
      (error) => { console.log("error", error); }
    )

  }


  getLabelsDashboard() {
    this.svc.getLabels().subscribe(
      (response) => {
        console.log("success", response);
        this.label = response['data']['details'];
        console.log(this.label)
      },
      (error) => { console.log("error", error) }
    )
  }

  addlabels() {

    this.addlabeldata = {

      "label": this.labels.value,
      "userId": this.data.userId,
      "isDeleted": this.data.isDeleted

    }

    console.log(this.addlabeldata)
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    }
    this.http.post(this.baseUrl+'notes/' + this.data.id + '/noteLabels',
      {
        "label": this.labels.value, "userId": this.data.userId,
        "isDeleted": this.data.isDeleted
      }, httpOptions).subscribe(
        (response) => {
          console.log("success", response);
          this.labelresponse = response
          console.log("label response", this.labelresponse)

        },
        (error) => { console.log("error", error); }
      )
  }

  addinglabel(labels) {
    this.addlabel = {
      "noteId": this.data.id,
      "lableId": labels.id


    }
    console.log("selected label", this.addlabel);
    this.svc.addingchecklistlabels('notes/' + this.data.id + '/addLabelToNotes/' + labels.id + '/add', this.addlabel).subscribe(
      (Response) => { console.log("success", Response) },
      (error) => { console.log("error", error) }
    )


  }
  stopPropagation(event) {
    event.stopPropagation();
    // console.log("Clicked!");
  }

  delete() {
    console.log(this.data.id);
    console.log("deleted")

    this.deletevalue = !this.deletevalue

    this.deleteData = {
      "isDeleted": this.deletevalue,
      "noteIdList": [this.data.id]
    }
    console.log(this.deleteData);
    this.svc.trashnote(this.deleteData).subscribe(
      (response) => {
        console.log("success", response);
        
        console.log(this.data)
      },
      (error) => { console.log("error", error); }
    )
  }
  openSnackBarReminder() {
    this.snackBar.open("reminder added!!", 'OK', {
      duration: 3000
    });
  }
  laterToday(){
const newdate = new Date();
newdate.setHours(8);
newdate.setMinutes(0);
newdate.setSeconds(0);
console.log(newdate);
this.remindData = {
  "reminder": [newdate], "noteIdList": [this.data.id]

}
this.svc.remindMe(this.remindData).subscribe(
  (response) => {
    console.log("success", response);
    this.openSnackBarReminder()

  },
  (error) => { console.log("error", error); }

)
  }
  tommorow(){
   const newdate=new Date();
   newdate.setDate(1);
   newdate.setMonth(3)
   newdate.setHours(8)
   newdate.setMinutes(0);
newdate.setSeconds(0);
   console.log(newdate);
   this.remindData = {
    "reminder": [newdate], "noteIdList": [this.data.id]

  }
  this.svc.remindMe(this.remindData).subscribe(
    (response) => {
      console.log("success", response);
      this.openSnackBarReminder()

    },
    (error) => { console.log("error", error); }

  )
   
 }
 nextweek(){
  const newdate=new Date();
  newdate.setHours(168)
  newdate.setMinutes(362);
  newdate.setSeconds(0);
  console.log(newdate)
  this.remindData = {
    "reminder": [newdate], "noteIdList": [this.data.id]

  }
  this.svc.remindMe(this.remindData).subscribe(
    (response) => {
      console.log("success", response);
      this.openSnackBarReminder()

    },
    (error) => { console.log("error", error); }

  )
 }
}