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

  date = new FormControl('');
  time = new FormControl('');
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
  dateData: any[] = [];
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
    this.getLabelsDashboard()
    this.email = localStorage.getItem('email')
  }
  addItem() {
    this.listItem = !this.listItem
  }
  serachEmail(str: string): void {
    this.word = str;
    this.svc.serachuser({ "searchWord": this.word }).subscribe(
      (Response) => {
        this.emails = Response['data']['details'];
        for (let val of Response['data']['details']) {
          this.firstName = val.firstName;
          this.lastName = val.lastName;
          this.userId = val.userId;
        }
      },
      (error) => {
      }
    )
  }
  opencollaborator() {
    this.colab = !this.colab
  }
  showDiv() {
    this.flag = !this.flag;
  }
  pin() {
    this.pinValue = !this.pinValue;
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  archive() {
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

  }
  addinglabel(labels) {
    this.addedlabel.push(labels)
  }
  laterToday() {
    this.newdate = new Date();
    this.newdate.setHours(8);
    this.newdate.setMinutes(0);
    this.newdate.setSeconds(0);
    this.dateData.push(this.newdate)
  }
  tommorow() {
    this.newdate = new Date();
    this.newdate.setDate(1);
    this.newdate.setMonth(3)
    this.newdate.setHours(8)
    this.newdate.setMinutes(0);
    this.newdate.setSeconds(0);
    this.dateData.push(this.newdate)
  }
  nextweek() {
    const newdate = new Date();
    newdate.setHours(168)
    newdate.setMinutes(362);
    newdate.setSeconds(0);
    this.dateData.push(this.newdate)
  }
  createNote() {

    this.collaboratorData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.word,
      "userId": this.userId,

    }

    this.addCheckList = new addCheckList();
    this.addCheckList.itemName = this.item;
    this.addCheckList.status = "open";

    this.itemDataarray.push(this.addCheckList)
    this.noteData = {
      "title": this.title.value,
      "description": this.description.value,
      "isPined": this.pinValue,
      "isArchived": this.archiveValue,
      "color": this.color,
      "reminder": this.dateData,
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

      this.svc.createnote(this.noteData).subscribe(
        (response) => {
          this.child.getNoteData();
        },
        (error) => {
        }
      );
    }
    else {
      this.openSnackBarError();
    }
    this.flag = !this.flag;

  }

  changeColor(color) {

    this.color = color;

  }
  addtochecklist($event) {
    this.item = $event
  }
  getLabelsDashboard() {
    this.svc.getLabels().subscribe(
      (response) => {
        this.label = response['data']['details'];
      },
      (error) => {
      }
    )
  }
}
