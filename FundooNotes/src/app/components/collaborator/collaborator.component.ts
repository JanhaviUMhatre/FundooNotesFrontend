import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/notes/note.service';
import { environment } from 'src/environments/environment';
import { ViewService } from 'src/app/services/viewservice/view.service';



@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  email = new FormControl('');
  collaboratordata: any;
  emails: any;
  public word: string = "";
  firstName: any;
  lastName: any;
  userId: any;
  baseUrl = environment.baseUrl;
  isActive = false;


  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private svc: NoteService,
    private view: ViewService) { }

  ngOnInit() {

    this.geCollab()
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
      (error) => { }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addcollaborator() {
    this.collaboratordata = {
      "id": this.data.noteId,

      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.word,
      "userId": this.userId
    }

    this.svc.addCollaborator(this.baseUrl + 'notes/' + this.data.noteId + '/AddcollaboratorsNotes', this.collaboratordata).subscribe(
      (Response) => {



      },
      (error) => {

      }
    )
    this.dialogRef.close();
  }
  removecollaborator() {

    this.svc.removeCollaborator(this.baseUrl + 'notes/' + this.data.noteId + '/removeCollaboratorsNotes/' + this.data.colUserid,
    ).subscribe(
      (Response) => { },
      (error) => { }
    )
  }

  geCollab() {

  }
}