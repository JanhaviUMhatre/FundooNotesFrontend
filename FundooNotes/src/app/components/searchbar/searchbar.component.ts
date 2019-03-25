// ***********************************************************************************
// * Purpose: search component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 27-2-2019
// *
// ***********************************************************************************
import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  data:any;
  Search: any;
  constructor(private svc :NoteService,private ser : SearchService) { }

  ngOnInit() {
    this.ser.currentMessage.subscribe(message => {
      this.Search = message;
    })
    this.getNoteData()
  }
  getNoteData(){
    this.svc.getNotes().subscribe(
      (response) => {console.log("success get notes",response)
    this.data = response['data']['data']; 
    console.log(this.data)

    },
      (error) => {console.log("error",error);}
      )
      
  }

}
