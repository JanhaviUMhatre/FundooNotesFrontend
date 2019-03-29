import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.baseUrl;
  private cardinfo = new BehaviorSubject('');
  cards = this.cardinfo.asObservable();
  
  constructor(private user: HttpService) { }


  sendinfocard(info: any) {
    this.cardinfo.next(info)
  }
  getservice(){
    return this.user.getFormData(this.baseUrl+'user/service/')
  }
}
