// ***********************************************************************************
// * Purpose: notes component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 20-2-2019
// *
// ***********************************************************************************
//import { AmazingTimePickerService } from 'amazing-time-picker';
import { environment } from 'src/environments/environment';
import { Router, Route } from '@angular/router'
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DemoComponent } from '../demo/demo.component';
import { PinedComponent } from '../pined/pined.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { FootermenuComponent } from '../footermenu/footermenu.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  deletevalue = false;
  cardArray: any;
  data: any;
  isActive = false;
  color: any;
  flagnote: any;
  footerData: any;
  labelresponse: any;
  baseUrl = environment.baseUrl;

  @Output() getId = new EventEmitter();
  deleteData: { "isDeleted": boolean; "noteIdList": any[]; };
  archivevalue = false;
  archiveData: { "isArchived": boolean; "noteIdList": any[]; };
  pinValue = false;
  id: any;
  //

  date = new FormControl('');
  time = new FormControl('');
  remindData: any;
  updateData: any;
  pinData: { "isPined": boolean; "noteIdList": any[]; };
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
  ColorData: { "color": boolean; "noteIdList": any[]; };
  carddata = this.data;
  msgPin: any;

  //PinIcon:any="unpinIcon"
  dataRefresher: any;
  @ViewChild(PinedComponent) child;

  @Input() arrayCards;
  @Input() Search;

  selectable = true;
  removable = true;
  menuid: any;
  word: any;
  newArray: any[];
  today: number = Date.now();
  message: string = "row wrap";
  addlabeldata: { "label": any; "userId": any; "isDeleted": any; };
  labels = new FormControl('')
  addlabel: any;
  label: any;
  collaborators: any;
  ispinnedArray: any;

  constructor(private que: QuestionService, private router: Router, private http: HttpClient, private snackBar: MatSnackBar, private view: ViewService, private ser: SearchService, public dialog: MatDialog, private svc: NoteService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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

  ngOnInit() {
    this.getNoteData()
    this.view.currentMessage.subscribe(message => this.message = message)
    //this.view.currentlabel.subscribe(label => this.label = label)
    //this.view.currentEmail.subscribe(word => this.word = word)
    this.getLabelsDashboard()
 

  }

  addinglabel(labels, note) {
    this.addlabel = {
      "noteId": note.id,
      "lableId": labels.id


    }
    console.log("selected label", this.addlabel);
    this.svc.addingchecklistlabels('notes/' + note.id + '/addLabelToNotes/' + labels.id + '/add', this.addlabel).subscribe(
      (Response) => { console.log("success", Response) },
      (error) => { console.log("error", error) }
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


  submit() {
    console.log(this.date.value, this.time.value)
  }
  //get notes data
  openSnackBar() {
    this.snackBar.open("archived!!", 'OK', {
      duration: 3000
    });
  }
  openSnackBarDelete() {
    this.snackBar.open("deleted!!", 'OK', {
      duration: 3000
    });
  }

  openSnackBarpin() {
    this.snackBar.open("pined!!", 'OK', {
      duration: 3000
    });
  }
  openSnackBarunpin() {
    this.snackBar.open("unpined!!", 'OK', {
      duration: 3000
    });
  }
  openSnackBarReminder() {
    this.snackBar.open("reminder added!!", 'OK', {
      duration: 3000
    });
  }
  getNoteData() {
    this.svc.getNotes().subscribe(
      (response) => {
        console.log("success get notes", response)
        this.data = response['data']['data'];
        this.child.getNoteDatas()

        this.data.reverse();
        console.log("in response", this.data)


        this.cardArray = this.data.filter(function (e) {
          return (e.isDeleted === false && e.isArchived === false)
        });
        this.cardArray = this.data.filter(function (e) {
          return (e.isPined === false)
        });

        this.ispinnedArray = this.data.filter(function (e) {
          return (e.isDeleted === false && e.isArchived === false && e.isPined === true)
        });
        console.log("cardsArray", this.cardArray)
      },
      (error) => { console.log("error", error); }
    )

  }



  //pin/unpin notes
  pin(card) {
    console.log("called pin");
    this.pinValue = !this.pinValue;
    this.msgPin = this.pinValue;

    console.log(card.id)
    this.pinData = {
      "isPined": this.pinValue,
      "noteIdList": [card.id]
    }
    console.log(this.pinData)
    this.svc.pinnote(this.pinData).subscribe(
      (response) => {
        console.log("success", response);
        this.view.pinMessage(this.msgPin)
        this.child.getNoteDatas()
        this.getNoteData()
        console.log("pin response", response)
      },
      (error) => { console.log("error", error); }
    )
  }

  //change color of notes
  changeColor(color) {

    this.color = color;
    //card.color = color;
    console.log(this.color, this.id)
    this.ColorData = {
      "color": this.color,
      "noteIdList": [this.id]
    }
    console.log(this.ColorData)
    this.svc.colornote(this.ColorData).subscribe(
      (response) => {
        console.log("success", response);
        console.log(this.data)
      },
      (error) => { console.log("error", error); }
    )

  }
  getcolorid(card) {
    this.id = card.id
    console.log(this.id)
  }

  //trash notes
  delete(card) {
    console.log(card.id);
    console.log("deleted")

    this.deletevalue = !this.deletevalue

    this.deleteData = {
      "isDeleted": this.deletevalue,
      "noteIdList": [card.id]
    }
    console.log(this.deleteData);
    this.svc.trashnote(this.deleteData).subscribe(
      (response) => {
        console.log("success", response);
        this.openSnackBarDelete()
        this.getNoteData()
        console.log(this.data)
      },
      (error) => { console.log("error", error); }
    )
  }

  //archive notes
  archive(card) {
    console.log(card.id);
    console.log("archived")

    this.archivevalue = !this.archivevalue

    this.archiveData = {
      "isArchived": this.archivevalue,
      "noteIdList": [card.id]
    }
    console.log(this.archiveData);
    this.svc.archivednote(this.archiveData).subscribe(
      (response) => {
        console.log("success", response);
        this.openSnackBar()
        this.getNoteData()
        console.log(this.data)
      },
      (error) => { console.log("error", error); }
    )
    this.updateNotes(card)
  }

  updateNotes(card) {
    this.updateData = {
      "noteId": card.id,
      "title": card.title,
      "description": card.description
    }
    console.log("dataaaaa", this.updateData)
    this.svc.updatednote(this.updateData).subscribe(
      (response) => {
        console.log("success", response);
        console.log(this.data)
      },
      (error) => { console.log("error", error); }
    )
  }
  questionAnswer(card) {
    this.que.changeMessage(card.title)
    this.que.changeMessageD(card.description)
    this.que.changeMessageArray(card.id)
  }
  //dialog box
  openDialog(card, labels): void {
    const dialogRef = this.dialog.open(LabelsComponent,
      {
        data: {
          id: card.id,
          title: card.title,
          description: card.description,
          color: card.color,
          isDeleted: card.isDeleted,
          userId: card.userId,
          label: labels.label

        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  openDialogCollaborate(userInfo, noteId, colemail, colUserid): void {
    const dialogRef = this.dialog.open(CollaboratorComponent,
      {
        data: {
          noteId: noteId,
          email: userInfo.email,
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          userId: userInfo.userId,
          collaborator: colemail,
          colUserid: colUserid
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  //add labels
  addlabels(card) {
    console.log("from addlabels", card.id);
    this.addlabeldata = {

      "label": this.labels.value,
      "userId": card.userId,
      "isDeleted": card.isDeleted

    }

    console.log(this.addlabeldata)
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    }
    this.http.post('http://34.213.106.173/api/notes/' + card.id + '/noteLabels',
      {
        "label": this.labels.value, "userId": card.userId,
        "isDeleted": card.isDeleted
      }, httpOptions).subscribe(
        (response) => {
          console.log("success", response);
          this.labelresponse = response
          console.log("label response", this.labelresponse)
          this.getNoteData()
        },
        (error) => { console.log("error", error); }
      )
  }
  newLabel() {
    this.view.changelabel(this.labelresponse)
  }

  stopPropagation(event) {
    event.stopPropagation();
    // console.log("Clicked!");
  }
  removecollaborator(noteId, userId) {

    console.log(noteId, userId)
    this.svc.removeCollaborator(this.baseUrl + 'notes/' + noteId + '/removeCollaboratorsNotes/' + userId,
    ).subscribe(
      (Response) => { (console.log("success", Response)) },
      (error) => { (console.log("error", error)) }
    )
  }
  reminder(card) {
    var newdate = this.date.value.toLocaleDateString() + " " + this.time.value
    console.log(newdate)
    this.remindData = {
      "reminder": [this.date.value], "noteIdList": [this.id]

    }
    console.log(this.remindData)
    this.svc.remindMe(this.remindData).subscribe(
      (response) => {
        console.log("success", response);
        this.openSnackBarReminder()

      },
      (error) => { console.log("error", error); }

    )

  }

  deletelabelforever(labels, note) {
    this.svc.deletenoteLabels('notes/' + note.id + '/addLabelToNotes/' + labels.id + '/remove', {
      "noteId": note.id, "lableId": labels.id
    }).subscribe(
      (response) => {
        console.log("success", response);
        this.getNoteData()
      },
      (error) => { console.log("error", error) }
    )
  }
  questions() {
    this.router.navigate['questions'];
  }

}


