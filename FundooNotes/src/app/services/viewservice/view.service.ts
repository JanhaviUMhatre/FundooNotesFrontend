import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
//pin
private pinSource = new BehaviorSubject("false");
  currentpin = this.pinSource.asObservable();

  private messageSource = new BehaviorSubject("row wrap");
  //private collaboratoremail = new BehaviorSubject("default email");
  private labelSource = new BehaviorSubject(null);
  private loginSource = new Subject<any>();
  currentMessage = this.messageSource.asObservable();
  //currentEmail = this.collaboratoremail.asObservable();
  currentlabel = this.labelSource.asObservable();
  currentlogin = this.loginSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  // changeEmail(word: string) {
  //   this.messageSource.next(word)
  // }
  changelabel(label: string) {
    this.labelSource.next(label)
  }
  sendMessage(data: string) {
    this.loginSource.next({ text: data });
}

  loginResponse(): Observable <any> {
      return this.loginSource.asObservable();
  };

  //pin
  pinMessage(msgPin: string) {
    this.pinSource.next(msgPin)
  }


}