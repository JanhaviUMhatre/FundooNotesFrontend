import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = environment.baseUrl;


  private messageSourceTitle = new BehaviorSubject('title');
  private messageSourceDescription = new BehaviorSubject('description');
  currentMessage = this.messageSourceTitle.asObservable();
  currentMessageD = this.messageSourceDescription.asObservable();

  private messageSourceArray = new BehaviorSubject('id')
  currentMessageArray = this.messageSourceArray.asObservable();
  constructor(private user: HttpService) { }
  changeMessage(title: string) {
    this.messageSourceTitle.next(title)
  }

  changeMessageD(description: string) {
    this.messageSourceDescription.next(description)
  }
  changeMessageArray(id: string) {
    this.messageSourceArray.next(id)
  }

  addquestionans(userData) {
    return this.user.PostForm(this.baseUrl + 'questionAndAnswerNotes/addQuestionAndAnswer', userData)
  }
  getNotesDetails(url) {
    return this.user.getForm(this.baseUrl + url)
  }
  addmessage(url,userData){
    return this.user.PostForm(this.baseUrl+url,userData)
  
  }
  rating(url,userData){
    return this.user.PostForm(this.baseUrl+url,userData)
  }
  likequestion(url,userData){
    return this.user.postMethodJSON(this.baseUrl+url,userData)
  }
}