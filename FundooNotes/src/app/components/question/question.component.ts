import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionService } from 'src/app/services/question/question.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  flag = true;
  title: string;
  likes = false;
  id: any;
  description: any;
  public question: string;
  questiondata: any;
  queans: any;
  profile: any;
  firstname: any;
  messagedata: any;
  public message: string;
  answer: any;
  profilee: any;
  firstnamee: any;
  questionasked: any;
  createdDate: any;
  q: any;
  parentId: any;
  user: Array<any> = [];
  stars: any;
  model: any;
  constructor(private que: QuestionService) { }

  ngOnInit() {

    this.que.currentMessage.subscribe(title => this.title = title)
    this.que.currentMessageD.subscribe(description => this.description = description)
    this.que.currentMessageArray.subscribe(id => this.id = id)
    this.getNoteDetails()
  }
  onRate($event, parentId) {

    this.stars = $event.newValue
    this.que.rating('questionAndAnswerNotes/rate/' + parentId, { "rate": this.stars }).subscribe(
      (response) => {
      },
      (error) => {
      }
    )

  }
  getNoteDetails() {
    this.que.getNotesDetails('notes/getNotesDetail/' + this.id).subscribe(
      (response) => {
        for (let i of response['data']['data']) {
          this.queans = i['questionAndAnswerNotes']
          this.questionasked = i['questionAndAnswerNotes'][0]
          for (let k of this.queans) {
            this.q = this.questionasked.message
            this.createdDate = k['createdDate']

          }
          for (let j of this.queans) {

            this.user.push(j['user'])


          }
        }


      },
      (error) => {
      }
    )
  }

  getquestion() {
    this.questiondata = {
      "message": this.question,
      "notesId": this.id
    }
    this.que.addquestionans(this.questiondata).subscribe(
      (response) => {
        this.getNoteDetails()
      },
      (error) => {
      }
    )

  }

  showDiv(parentId) {
    this.flag = !this.flag
    this.parentId = parentId
  }
  like(parentId) {
    this.likes = !this.likes
    this.model = {
      "like": true,
      "parentId": parentId
    }
    this.que.likequestion('questionAndAnswerNotes/like/' + parentId, this.model).subscribe(
      (response) => {
      },
      (error) => {
      }
    )
  }

  replyMessage() {

    this.messagedata = {
      "message": this.message,
      "parentId": this.parentId,

    }
    this.que.addmessage('questionAndAnswerNotes/reply/' + this.parentId, this.messagedata).subscribe(
      (response) => {
        this.answer = response['data']['details'];
        for (let j of this.answer) {
          this.profilee = j['user']['imageUrl']
          this.firstnamee = j['user']['firstName']
        }
      },
      (error) => {
      }
    )

  }

}