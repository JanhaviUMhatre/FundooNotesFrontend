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
  reminderNotes: any[];

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

    this.getLabelsDashboard()


  }

  addinglabel(labels, note) {
    this.addlabel = {
      "noteId": note.id,
      "lableId": labels.id


    }
    this.svc.addingchecklistlabels('notes/' + note.id + '/addLabelToNotes/' + labels.id + '/add', this.addlabel).subscribe(
      (Response) => {
      },
      (error) => {
      }
    )


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


  submit() {
  }
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
        this.data = response['data']['data'];
        this.child.getNoteDatas()

        this.data.reverse();


        this.cardArray = this.data.filter(function (e) {
          return (e.isDeleted === false && e.isArchived === false)
        });
        this.cardArray = this.data.filter(function (e) {
          return (e.isPined === false)
        });

        this.ispinnedArray = this.data.filter(function (e) {
          return (e.isDeleted === false && e.isArchived === false && e.isPined === true)
        });

        for (let i in this.cardArray) {
          this.reminderNotes = i['reminder']
        }
      },
      (error) => {
      }
    )

  }



  pin(card) {
    this.pinValue = !this.pinValue;
    this.msgPin = this.pinValue;

    this.pinData = {
      "isPined": this.pinValue,
      "noteIdList": [card.id]
    }
    this.svc.pinnote(this.pinData).subscribe(
      (response) => {
        this.view.pinMessage(this.msgPin)
        this.child.getNoteDatas()
        this.getNoteData()
      },
      (error) => { }
    )
  }

  changeColor(color) {

    this.color = color;
    this.ColorData = {
      "color": this.color,
      "noteIdList": [this.id]
    }
    this.svc.colornote(this.ColorData).subscribe(
      (response) => {
      },
      (error) => { }
    )

  }
  getcolorid(card) {
    this.id = card.id
  }

  //trash notes
  delete(card) {


    this.deletevalue = !this.deletevalue

    this.deleteData = {
      "isDeleted": this.deletevalue,
      "noteIdList": [card.id]
    }
    this.svc.trashnote(this.deleteData).subscribe(
      (response) => {
        this.openSnackBarDelete()
        this.getNoteData()
      },
      (error) => { }
    )
  }

  //archive notes
  archive(card) {


    this.archivevalue = !this.archivevalue

    this.archiveData = {
      "isArchived": this.archivevalue,
      "noteIdList": [card.id]
    }
    this.svc.archivednote(this.archiveData).subscribe(
      (response) => {

        this.openSnackBar()
        this.getNoteData()

      },
      (error) => { }
    )
    this.updateNotes(card)
  }

  updateNotes(card) {
    this.updateData = {
      "noteId": card.id,
      "title": card.title,
      "description": card.description
    }
    this.svc.updatednote(this.updateData).subscribe(
      (response) => {
      },
      (error) => { }
    )
  }
  questionAnswer(card) {
    this.que.changeMessage(card.title)
    this.que.changeMessageD(card.description)
    this.que.changeMessageArray(card.id)
  }
  //dialog box
  openDialog(card, labels, reminder): void {

    const dialogRef = this.dialog.open(LabelsComponent,
      {
        data: {
          id: card.id,
          title: card.title,
          description: card.description,
          color: card.color,
          isDeleted: card.isDeleted,
          userId: card.userId,
          label: labels.label,
          reminder: reminder,
          dataInfo: card.collaborators

        }
      });

    dialogRef.afterClosed().subscribe(result => {

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

    });
  }
  //add labels
  addlabels(card) {
    this.addlabeldata = {

      "label": this.labels.value,
      "userId": card.userId,
      "isDeleted": card.isDeleted

    }

    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    }
    this.http.post(+this.baseUrl + 'notes/' + card.id + '/noteLabels',
      {
        "label": this.labels.value, "userId": card.userId,
        "isDeleted": card.isDeleted
      }, httpOptions).subscribe(
        (response) => {
          this.labelresponse = response
          this.getNoteData()
        },
        (error) => { }
      )
  }
  newLabel() {
    this.view.changelabel(this.labelresponse)
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
  removecollaborator(noteId, userId) {

    this.svc.removeCollaborator(this.baseUrl + 'notes/' + noteId + '/removeCollaboratorsNotes/' + userId,
    ).subscribe(
      (Response) => { },
      (error) => { }
    )
  }
  reminder(card) {
    var newdate = this.date.value.toLocaleDateString() + " " + this.time.value
    this.remindData = {
      "reminder": [this.date.value], "noteIdList": [this.id]

    }
    this.svc.remindMe(this.remindData).subscribe(
      (response) => {
        this.openSnackBarReminder()

      },
      (error) => { }

    )

  }

  deletelabelforever(labels, note) {
    this.svc.deletenoteLabels('notes/' + note.id + '/addLabelToNotes/' + labels.id + '/remove', {
      "noteId": note.id, "lableId": labels.id
    }).subscribe(
      (response) => {
        this.getNoteData()
      },
      (error) => { }
    )
  }
  questions() {
    this.router.navigate['questions'];
  }

}

