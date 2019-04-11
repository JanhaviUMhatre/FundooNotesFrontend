import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  data: any;
  isActive = false;
  constructor(private svc: NoteService) { }

  ngOnInit() {
    this.getReminder();
  }
  getReminder() {
    this.svc.getReminderNotes().subscribe(
      (response) => {
        this.data = response['data']['data']
      },
      (error) => { }
    )
  }
}
