import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private user: HttpService) { }
  registration(userData) {
    return this.http.post<any>(this.baseUrl + 'user/userSignUp', userData)
  }

  login(userData) {
    return this.http.post<any>(this.baseUrl + 'user/login', userData)
  }
  reset(userData) {
    return this.http.post<any>(this.baseUrl + 'user/reset', userData)
  }
  resetpassword(userData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + 'user/reset-password', userData, httpOptions)
  }


  uploadProfile(userData, data: any) {
    return this.user.PostForm(this.baseUrl + 'user/uploadProfileImage', userData)
  }


  NEWupload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const HttpUploadOptions = {
      headers: new HttpHeaders(
        { 'Authorization': localStorage.getItem('token') }

      )
    }
    return this.http.post(this.baseUrl + 'user/uploadProfileImage', formData, HttpUploadOptions)
  }
}