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

  constructor(private svc: HttpService, private router: Router) { }

  ngOnInit() {
    this.getQueData();
  }
  getQueData() {
    this.svc.getDataque().subscribe(
      (response) => {
        this.data = response['data']
        this.data.reverse()
      },
      (error) => { }
    )
  }
  gotohome() {
    this.router.navigate(['/admindashboard']);
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
  approve(user) {
    this.svc.approvenotes('questionAndAnswerNotes/approve/' + user.parentId, { "parentId": user.parentId }).subscribe(
      (response) => {
        this.getQueData()
      },
      (error) => { }
    )
  }
  unapporove(user) {
    this.svc.approvenotes('questionAndAnswerNotes/reject/' + user.parentId, { "parentId": user.parentId }).subscribe(
      (response) => {
        this.getQueData()
      },
      (error) => { }
    )
  }
}
