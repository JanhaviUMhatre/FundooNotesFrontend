import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})
export class AddlabelComponent implements OnInit {
  namelabel: string
  data: any;
  constructor(private view: ViewService, private note: NoteService) { }

  ngOnInit() {
    this.view.labelName.subscribe(namelabel => this.namelabel = namelabel)
    this.getlabelnotes()
  }
  getlabelnotes() {
    this.note.getLabelNote(this.namelabel).subscribe(
      (response) => {
        this.data = response['data']['data']
      },
      (error) => {

      }
    )
  }
}
