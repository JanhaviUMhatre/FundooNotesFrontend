// ***********************************************************************************
// * Purpose: Add note component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 18-2-2019
// *
// ***********************************************************************************

import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/services/notes/note.service';
import { NotesComponent } from '../notes/notes.component';
import { addCheckList } from 'src/app/models/createnote.model';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  @Output() noteEvent = new EventEmitter<string>();
  public word: string;
  email: any;
  colab = true;
  flag = false;
  isActive = false;
  pinValue = false;
  archiveValue = false;
  pinnedIconSrc = "../../assets/Icons/pinIcon.svg";
  unpinnedIconSrc = "../../assets/Icons/unpinIcon.svg";
  //color code array
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
  color: any = "#ffffff";
  notificationIcon = "../../assets/Icons/notification.svg";
  noteData: any;

  //note : CreateNote =new CreateNote;
  date = new FormControl('');
  time = new FormControl('');
  // item = new FormControl('')
  title = new FormControl('')
  description = new FormControl('')
  remindData: { "reminder": any[]; };
  collaboratorData: any;
  emails: any;
  firstName: any;
  lastName: any;
  userId: any;
  label: any;
  addedlabel: any[] = [];
  itemDataarray: any[] = [];
  labeldata: number;
  collab: string;
  listItem = true;
  item: any;
  itemData: { "itemName": any; "status": (url?: string, target?: string, features?: string, replace?: boolean) => Window; };
  addCheckList: any;
  newdate: Date;
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private snackBar: MatSnackBar, private svc: NoteService
  ) {
    this.matIconRegistry.addSvgIcon(
      "unpinIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/unpinIcon.svg"),

    );
    this.matIconRegistry.addSvgIcon(
      "pinIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/pinIcon.svg"),

    );
  }
  @ViewChild(NotesComponent) child;
  ngOnInit() {
    // this. createNote();
    this.getLabelsDashboard()
    this.email = localStorage.getItem('email')
  }
  addItem() {
    this.listItem = !this.listItem
  }
  serachEmail(str: string): void {
    this.word = str;
    //console.log(this.word)
    this.svc.serachuser({ "searchWord": this.word }).subscribe(
      (Response) => {
        console.log("success search", Response['data']['details'])
        this.emails = Response['data']['details'];
        console.log("this is response", Response)
        for (let val of Response['data']['details']) {
          this.firstName = val.firstName;
          this.lastName = val.lastName;
          this.userId = val.userId;
        }
      },
      (error) => { console.log("error", error) }
    )
  }
  opencollaborator() {
    this.colab = !this.colab
  }
  //change div
  showDiv() {
    console.log("called div");
    this.flag = !this.flag;
  }
  //pin/unpin
  pin() {
    console.log("called pin");
    this.pinValue = !this.pinValue;
  }
  stopPropagation(event) {
    event.stopPropagation();
    // console.log("Clicked!");
  }
  //archive note
  archive() {
    console.log("called archive");
    this.archiveValue = !this.archiveValue;

    this.openSnackBar();
  }


  openSnackBar() {
    this.snackBar.open("archived!!", 'OK', {
      duration: 3000
    });
  }
  openSnackBarError() {
    this.snackBar.open("please provide title and description", 'OK', {
      duration: 3000
    });
  }

  reminder() {
    this.remindData = {
      "reminder": [this.date.value]

    }
    console.log(this.remindData)
    // this.svc.remindMe(this.remindData).subscribe(
    //   (response) => {console.log("success",response);

    // },
    //   (error) => {console.log("error",error);}

    // )
  }
  addinglabel(labels) {
    console.log(labels)
    this.addedlabel.push(labels)
    console.log(this.addedlabel)
  }
  laterToday(){
    this.newdate = new Date();
    this.newdate.setHours(8);
    this.newdate.setMinutes(0);
    this.newdate.setSeconds(0);
    console.log(this.newdate);}
    tommorow(){
      this.newdate=new Date();
      this.newdate.setDate(1);
      this.newdate.setMonth(3)
      this.newdate.setHours(8)
      this.newdate.setMinutes(0);
      this.newdate.setSeconds(0);
      console.log( this.newdate);}
      nextweek(){
        const newdate=new Date();
        newdate.setHours(168)
        newdate.setMinutes(362);
        newdate.setSeconds(0);
        console.log(newdate)}
  //main function to create note
  createNote() {

    // console.log(token,userId);
    this.collaboratorData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.word,
      "userId": this.userId,

    }

    this.addCheckList = new addCheckList();
this.addCheckList.itemName = this.item;
this.addCheckList.status = "open";

console.log(this.addCheckList);
    this.itemDataarray.push(this.addCheckList)
    //this.collab=JSON.stringify(this.collaboratorData)
    console.log("collaboration data", this.collaboratorData)
    this.noteData = {
      "title": this.title.value,
      "description": this.description.value,
      "isPined": this.pinValue,
      "isArchived": this.archiveValue,
      "color": this.color,
      "reminder":  this.newdate,
      //"collaberators":JSON.stringify([this.collaboratorData]),
      "collaberators": JSON.stringify({
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.word,
        "userId": this.userId
      }),
      "labelIdList": JSON.stringify(this.addedlabel),
      "checklist": JSON.stringify(this.itemDataarray)
    }

    if (this.noteData.title != null || this.noteData.description != null) {
      console.log("note data", this.noteData);

      this.svc.createnote(this.noteData).subscribe(
        (response) => {
          console.log("success", response);
          this.child.getNoteData();
        },
        (error) => { console.log("error", error); }
      );
    }
    else {
      this.openSnackBarError();
    }
    this.flag = !this.flag;

  }
  //color
  changeColor(color) {

    this.color = color;

  }
  addtochecklist($event){
    this.item=$event
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
}
