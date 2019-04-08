import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  data: any;

  constructor(private svc : HttpService,private router: Router) { }

  ngOnInit() {
    this.getQueData();
  }
getQueData(){
  this.svc.getDataque().subscribe(
    (response)=>{console.log("success",response)
  this.data=response['data']
this.data.reverse()},
    (error)=>{console.log("error",error)}
  )
}
gotohome(){
  this.router.navigate(['/admindashboard']);
}
logout(){
  localStorage.removeItem('token')
  this.router.navigate(['/login']);
}
approve(user)
{
  console.log(user.parentId)
this.svc.approvenotes('questionAndAnswerNotes/approve/'+user.parentId,{"parentId":user.parentId}).subscribe(
  (response)=>{console.log("success",response)
this.getQueData()},
  (error)=>{console.log("error",error)}
)
}
unapporove(user){
  console.log(user.parentId)
  this.svc.approvenotes('questionAndAnswerNotes/reject/'+user.parentId,{"parentId":user.parentId}).subscribe(
    (response)=>{console.log("success",response)
  this.getQueData()},
    (error)=>{console.log("error",error)}
  )
}
}
