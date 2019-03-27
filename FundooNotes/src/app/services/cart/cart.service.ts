import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.baseUrl;
  constructor(private user: HttpService) { }

  getservice(){
    return this.user.getFormData(this.baseUrl+'user/service/')
  }
}
