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
  // createnote(userData){
  //   console.log(userData);
  //   return this.user.PostForm('http://34.213.106.173/api/notes/addNotes',userData)
  // }

  // archivednote(userData){
  //   return this.user.PostForm('http://34.213.106.173/api/notes/archiveNotes',userData)
  // }

  // getNotes(){
  //   return this.user.getForm('http://34.213.106.173/api/notes/getNotesList')
  //   }

  uploadProfile(userData, data: any) {
    return this.user.PostForm(this.baseUrl + 'user/uploadProfileImage', userData)
  }
  // postFile(mImage){
  //   const HttpUploadOptions = {
  //     headers: new HttpHeaders(
  //       //{ "Content-Type": "multipart/form-data",
  //    { 'Authorization':localStorage.getItem('token')}
  //   //}
  //   )
  //   }
  //   const formData = new FormData();
  //   //formData.append('data', mFormData);
  //   formData.append('image', mImage);
  //   return this.http.post(this.baseUrl+'user/uploadProfileImage', formData, HttpUploadOptions)
  // }

  NEWupload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const HttpUploadOptions = {
      headers: new HttpHeaders(
        //{ "Content-Type": "multipart/form-data",
        { 'Authorization': localStorage.getItem('token') }
        //}
      )
    }
    return this.http.post(this.baseUrl + 'user/uploadProfileImage', formData, HttpUploadOptions)
  }
}