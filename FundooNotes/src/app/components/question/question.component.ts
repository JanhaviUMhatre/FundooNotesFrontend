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
  likes=false;
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
  model : any ;
  constructor(private que: QuestionService) { }

  ngOnInit() {

    this.que.currentMessage.subscribe(title => this.title = title)
    this.que.currentMessageD.subscribe(description => this.description = description)
    this.que.currentMessageArray.subscribe(id => this.id = id)
    this.getNoteDetails()
  }
  onRate($event,parentId) {
     
      this.stars= $event.newValue
     console.log(this.stars);
     this.que.rating('questionAndAnswerNotes/rate/'+parentId,{"rate":this.stars}).subscribe(
       (response)=>{console.log("success",response);
       },
       (error)=>{console.log("error",error);
       }
     )
     
  }
  getNoteDetails() {
    this.que.getNotesDetails('notes/getNotesDetail/' + this.id).subscribe(
      (response) => {
        console.log("success", response)
        for (let i of response['data']['data']) {
          console.log(i['questionAndAnswerNotes'])
          this.queans = i['questionAndAnswerNotes']
          this.questionasked = i['questionAndAnswerNotes'][0]
          for (let k of this.queans) {
            this.q = this.questionasked.message
            this.createdDate = k['createdDate']
            
            console.log("--------", this.questionasked.message)
          }
          for (let j of this.queans) {

            this.user.push(j['user'])
            console.log(this.user)


          }
        }

        console.log("qqqqqqqqqqqqqqqq", this.queans)
        
      },
      (error) => { console.log("error", error) }
    )
  }

  getquestion() {
    console.log(this.question)
    this.questiondata = {
      "message": this.question,
      "notesId": this.id
    }
    console.log("from questions", this.questiondata)
    this.que.addquestionans(this.questiondata).subscribe(
      (response) => {
        console.log("successfully added question", response)
        this.getNoteDetails()
      },
      (error) => { console.log("error", error) }
    )

  }

  showDiv(parentId) {
    this.flag = !this.flag
    this.parentId = parentId
    console.log("parent id.....", this.parentId)
  }
  like(parentId){
    this.likes =! this.likes
    console.log("parent id is here" , parentId)
    this.model = {
      "like" : true,
      "parentId" : parentId
    }
    console.log(this.likes,parentId)
    this.que.likequestion('questionAndAnswerNotes/like/'+parentId, this.model).subscribe(
      (response)=>{console.log("success",response)},
      (error)=>{console.log("error",error);
      }
    )
  }

  replyMessage() {
    console.log(this.message)

    this.messagedata = {
      "message": this.message,
      "parentId": this.parentId,

    }
    console.log("from questions", this.messagedata)
    this.que.addmessage('questionAndAnswerNotes/reply/' + this.parentId, this.messagedata).subscribe(
      (response) => {
        console.log("successfully added reply", response)
        this.answer = response['data']['details'];
        for (let j of this.answer) {
          console.log("new for", j['user']['imageUrl'])
          this.profilee = j['user']['imageUrl']
          this.firstnamee = j['user']['firstName']
        }
      },
      (error) => { console.log("error", error) }
    )

  }

}