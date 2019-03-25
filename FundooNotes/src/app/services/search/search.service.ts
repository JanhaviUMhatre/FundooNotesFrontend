import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private messageSource = new Subject();
 
  private msgSource = new BehaviorSubject(false);
  currentMsg = this.msgSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  viewList = this.messageSource.asObservable();
  constructor() { }
  
  changeMessage(message:string){
    this.messageSource.next(message)
 }
}