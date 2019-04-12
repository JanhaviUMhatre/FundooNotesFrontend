// ***********************************************************************************
// * Purpose: archive component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 1-3-2019
// *
// ***********************************************************************************
import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  baseUrl = environment.baseUrl;
  isActive = false;
  data: any;
  pinvalue: any;
  pinData: any;
  archiveData: { "isArchived": any; "noteIdList": any[]; };
  label: any;
  constructor(public dialog: MatDialog, private svc: NoteService, private matIconRegistry: MatIconRegistry,
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
    this.getArchiveNoteData()
  }
  getArchiveNoteData() {
    this.svc.getArchiveNotes().subscribe(
      (response) => {
        this.data = response['data']['data'];


      },
      (error) => { }
    )

  }
  archive(card) {
    card.isArchived = !card.isArchived
    this.archiveData = {
      "isArchived": card.isArchived,
      "noteIdList": [card.id]
    }
    this.svc.archivednote(this.archiveData).subscribe(
      (response) => {

      },
      (error) => { }
    )
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
  openDialog(card): void {
    const dialogRef = this.dialog.open(LabelsComponent,
      {
        data: {
          id: card.id,
          title: card.title,
          description: card.description,
          color: card.color,
          isDeleted: card.isDeleted,
          userId: card.userId,

        }
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getLabelsDashboard() {
    this.svc.getLabels().subscribe(
      (response) => {
        this.label = response['data']['details'];
      },
      (error) => { }
    )
  }
  deletelabelforever(labels, note) {
    this.svc.deletenoteLabels('notes/' + note.id + '/addLabelToNotes/' + labels.id + '/remove', {
      "noteId": note.id, "lableId": labels.id
    }).subscribe(
      (response) => { },
      (error) => { }
    )
  }
}