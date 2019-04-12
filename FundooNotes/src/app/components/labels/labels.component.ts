import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatSnackBar, MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteService } from 'src/app/services/notes/note.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})


export class LabelsComponent implements OnInit {
  updateData: any;
  deleteData: { "isDeleted": boolean; "noteIdList": any[]; };
  deletevalue = false;
  archivevalue = false;
  title = new FormControl(this.data.title)
  description = new FormControl(this.data.description)
  labels = new FormControl('')
  baseUrl = environment.baseUrl;
  listItem = true;
  archiveData: { "isArchived": boolean; "noteIdList": any[]; };
  id: any;
  color: any;
  ColorData: { "color": any; "noteIdList": any[]; };
  pinValue = false;
  pinData: { "isPined": boolean; "noteIdList": any[]; };
  addlabeldata: any;
  label: any;
  remindData: { "reminder": Date[]; "noteIdList": any[]; };
  collaborator: any;
  colUserid: any;
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private http: HttpClient, public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private svc: NoteService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "unpinIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/unpinIcon.svg"),

    );
  }

  colorCode: Array<Object> = [
    { name: "white", colorCode: "#ffffff" },
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
  ngOnInit() {
    this.getLabelsDashboard()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(data) {

    this.deletevalue = !this.deletevalue

    this.deleteData = {
      "isDeleted": this.deletevalue,
      "noteIdList": [data]
    }
    this.svc.trashnote(this.deleteData).subscribe(
      (response) => {
      },
      (error) => {
      }
    )
  }

  pin(data) {
    this.pinValue = !this.pinValue;
    this.pinData = {
      "isPined": this.deletevalue,
      "noteIdList": [data]
    }
    this.svc.pinnote(this.pinData).subscribe(
      (response) => {
      },
      (error) => {
      }
    )
  }
  archive(data) {


    this.archivevalue = !this.archivevalue

    this.archiveData = {
      "isArchived": this.archivevalue,
      "noteIdList": [data]
    }

    this.svc.archivednote(this.archiveData).subscribe(
      (response) => {
      },
      (error) => {
      }
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
      (error) => {
      }
    )

  }
  openDialogCollaborate(): void {


    const dialogRef = this.dialog.open(CollaboratorComponent,
      {
        data: {
          noteId: this.data.id,
          email: this.data.email,
          id: this.data.id,

          collaborator: this.collaborator,
          colUserid: this.colUserid

        }

      }
    );
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  getcolorid(data) {
    this.id = data
  }

  //add labels
  addLabel(data) {
    this.addlabeldata = {

      "label": this.labels.value,
      "userId": data.userId,
      "isDeleted": data.isDeleted

    }

    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    }
    this.http.post(this.baseUrl + 'notes/' + data.id + '/noteLabels',
      {
        "label": this.labels.value, "userId": data.userId,
        "isDeleted": data.isDeleted
      }, httpOptions).subscribe(
        (response) => {

        },
        (error) => { }
      )
  }

  //update notes
  updateNotes(data) {

    this.updateData = {
      "noteId": data,
      "title": this.title.value,
      "description": this.description.value
    }
    this.svc.updatednote(this.updateData).subscribe(
      (response) => {


      },
      (error) => { }
    )
    this.dialogRef.close();
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
  stopPropagation(event) {
    event.stopPropagation();
  }
  openSnackBarReminder() {
    this.snackBar.open("reminder added!!", 'OK', {
      duration: 3000
    });
  }
  laterToday() {
    const newdate = new Date();
    newdate.setHours(8);
    newdate.setMinutes(0);
    newdate.setSeconds(0);
    this.remindData = {
      "reminder": [newdate], "noteIdList": [this.data.id]

    }
    this.svc.remindMe(this.remindData).subscribe(
      (response) => {
        this.openSnackBarReminder()

      },
      (error) => {
      }

    )
  }
  tommorow() {
    const newdate = new Date();
    newdate.setDate(1);
    newdate.setMonth(3)
    newdate.setHours(8)
    newdate.setMinutes(0);
    newdate.setSeconds(0);
    this.remindData = {
      "reminder": [newdate], "noteIdList": [this.data.id]

    }
    this.svc.remindMe(this.remindData).subscribe(
      (response) => {
        this.openSnackBarReminder()

      },
      (error) => {
      }

    )

  }
  nextweek() {
    const newdate = new Date();
    newdate.setHours(168)
    newdate.setMinutes(362);
    newdate.setSeconds(0);
    this.remindData = {
      "reminder": [newdate], "noteIdList": [this.data.id]

    }
    this.svc.remindMe(this.remindData).subscribe(
      (response) => {
        this.openSnackBarReminder()

      },
      (error) => {
      }

    )
  }
}
