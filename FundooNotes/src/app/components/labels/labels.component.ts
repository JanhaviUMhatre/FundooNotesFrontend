import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteService } from 'src/app/services/notes/note.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})


export class LabelsComponent implements OnInit {
updateData:any;
deleteData: { "isDeleted": boolean; "noteIdList": any[]; };
deletevalue=false;
archivevalue=false;
title = new FormControl(this.data.title)
description = new FormControl(this.data.description)
labels = new FormControl('')

  archiveData: { "isArchived": boolean; "noteIdList": any[]; };
  id: any;
  color: any;
  ColorData: { "color": any; "noteIdList": any[]; };
  pinValue= false;
  pinData: { "isPined": boolean; "noteIdList": any[]; };
  addlabeldata:any;
  constructor(private http: HttpClient,public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private svc :NoteService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "unpinIcon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/Icons/unpinIcon.svg"),
      
      ); }

      //color code array
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
  }
//close dialog box
  onNoClick(): void {
    this.dialogRef.close();
  }

  //delete note
  delete(data){
    console.log(data);
    console.log("deleted")
     
    this.deletevalue =! this.deletevalue
   
 this.deleteData={
   "isDeleted":this.deletevalue,
   "noteIdList":[data]
 }
  console.log(this.deleteData);
 this.svc.trashnote(this.deleteData).subscribe(
   (response) => {console.log("success",response);
 console.log(this.data)
 },
   (error) => {console.log("error",error);}
 )
   }

   //pin/unpin note
   pin(data){
    console.log("called pin");
    this.pinValue=!this.pinValue;
    console.log(data)
    this.pinData={
      "isPined":this.deletevalue,
      "noteIdList":[data]
    }
    console.log(this.pinData)
    this.svc.pinnote(this.pinData).subscribe(
      (response) => {console.log("success",response);
    console.log(this.data)
    },
      (error) => {console.log("error",error);}
    )
  }
  //archive note
   archive(data){
    console.log(data);
   console.log("archived")
    
   this.archivevalue =! this.archivevalue
  
this.archiveData={
  "isArchived":this.archivevalue,
  "noteIdList":[data]
}
 console.log(this.archiveData);
this.svc.archivednote(this.archiveData).subscribe(
  (response) => {console.log("success",response);
console.log(this.data)
},
  (error) => {console.log("error",error);}
)

  }

  //change color
  changeColor(color) {

    this.color = color;
    //card.color = color;
    console.log(this.color,this.id)
    this.ColorData={
      "color":this.color,
      "noteIdList":[this.id]
    }
    console.log(this.ColorData)
    this.svc.colornote(this.ColorData).subscribe(
      (response) => {console.log("success",response);
    console.log(this.data)
    },
      (error) => {console.log("error",error);}
    )

  }

  getcolorid(data){
   this.id = data
console.log(data)
  }

  //add labels
addLabel(data){
  this.addlabeldata={
      
    "label": this.labels.value,
    "userId": data.userId,
    "isDeleted": data.isDeleted
  
}

console.log(this.addlabeldata)
const httpOptions = {
  headers: new HttpHeaders({
   
    'Authorization':localStorage.getItem('token')
  })
}
this.http.post('http://34.213.106.173/api/notes/'+data.id+'/noteLabels',
{"label":this.labels.value,"userId": data.userId,
"isDeleted": data.isDeleted},httpOptions).subscribe(
  (response) => {console.log("success",response);
console.log(this.data)
},
  (error) => {console.log("error",error);}
)
}

//update notes
  updateNotes(data){
    
    this.updateData={
      "noteId":data,
      "title": this.title.value,
      "description":this.description.value
    }
    console.log("dataaaaa",this.updateData)
    this.svc.updatednote(this.updateData).subscribe(
      (response) => {console.log("success",response);
    console.log(this.data)
    },
      (error) => {console.log("error",error);}
    )
    this.dialogRef.close();
  }
}
