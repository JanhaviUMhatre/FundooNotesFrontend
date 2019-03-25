import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AdminDetails } from '../models/details.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment' 


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  login(userData){
    return this.http.post<any>(
      this.baseUrl+'user/adminLogin',userData).pipe(catchError(this.errorHandler))
    }

    getUserData() : Observable<AdminDetails[]> {
      return this.http.get<AdminDetails[]>(
        this.baseUrl+'user/getAdminUserList'
        ,{responseType:"json"}
      )
    }
   errorHandler(error : HttpErrorResponse){
        return throwError(error);
   }
    getData(){
      
      return this.http.get(this.baseUrl+'user/getAdminUserList')
    }
    getDataque(){
      const httpOptions = {
        headers: new HttpHeaders({
         
          'Authorization':localStorage.getItem('token')
        })
      }
      return this.http.get(this.baseUrl+'questionAndAnswerNotes/getUnApprovedAnswer',httpOptions)
    }

    approvenotes(url,userData){
      const httpOptions = {
        headers: new HttpHeaders({
         
          'Authorization':localStorage.getItem('token')
        })
      }
      return this.http.post(this.baseUrl+url,userData,httpOptions)
    }

    unapprovenotes(url,userData){
      const httpOptions = {
        headers: new HttpHeaders({
         
          'Authorization':localStorage.getItem('token')
        })
      }
      return this.http.post(this.baseUrl+url,userData,httpOptions)
    }
}
