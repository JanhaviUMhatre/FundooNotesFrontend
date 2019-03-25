import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import { ViewService } from 'src/app/services/viewservice/view.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  @Input() childMessage: any;
  cardArray: any;
data:any;
  msgPin:any;
  //data: any;
  ispinnedArray: any;
  constructor(private view: ViewService,private svc :NoteService) { }

  ngOnInit() {
    
    this.view.currentpin.subscribe(msgPin => this.msgPin = msgPin)
  }
  getNoteData(){
    this.svc.getNotes().subscribe(
      (response) => {console.log("success get notes",response)
    this.data = response['data']['data']; 

    this.data.reverse();
    console.log("in response",this.data)

    this.ispinnedArray=this.data.filter(function(e) {
      return (e.isDeleted===false && e.isArchived===false && e.isPined===true)
    });
    
    },
      (error) => {console.log("error",error);}
      )
      
  }
  


}