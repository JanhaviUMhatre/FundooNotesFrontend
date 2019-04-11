// ***********************************************************************************
// * Purpose: trash component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 28-2-2019
// *
// ***********************************************************************************
import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  deleteData: { "isDeleted": any; "noteIdList": any[]; };
  isActive = false;
  constructor(private svc: NoteService) { }
  data: any;
  ngOnInit() {
    this.getTrashNoteData()
  }

  getTrashNoteData() {
    this.svc.getTrashNotes().subscribe(
      (response) => {
        this.data = response['data']['data'];


      },
      (error) => { }
    )

  }
  delete(card) {
    card.isDeleted = !card.isDeleted
    this.deleteData = {
      "isDeleted": card.isDeleted,
      "noteIdList": [card.id]
    }
    this.svc.deleteforevernote(this.deleteData).subscribe(
      (response) => {
        this.getTrashNoteData();


      },
      (error) => { }
    )
  }
}
