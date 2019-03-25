// ***********************************************************************************
// * Purpose: login component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 7-2-2019
// *
// ***********************************************************************************

import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';

import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ViewService } from 'src/app/services/viewservice/view.service';
//import { AuthService } from 'src/app/services/AuthGuard/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

@Injectable()
export class LoginComponent implements OnInit {
isActive = false;
user: LoginModel = new LoginModel(); //object of login model
data:any;
constructor(private view: ViewService,private snackBar: MatSnackBar,
 // private Auth : AuthService,
  private svc : UserServiceService,private router: Router,private formBuilder: FormBuilder,private http:HttpClient){
}
loginForm = this.formBuilder.group({
  //confirm password validation
email : [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
password : [this.user.password, [Validators.required, // password validation
  Validators.minLength(6)]],

});
  ngOnInit() {
    
  }
  
  openSnackBar() {
    this.snackBar.open("you are logged in!!!!!", 'OK', {
      duration: 3000
    });
  
  }

  openSnackBarError() {
    this.snackBar.open("invalid email or password!!!!!", 'OK', {
      duration: 3000
    });
  
  }
  // after submitting form html will call onSubmit method
  onSubmit() {
   
    console.log(this.loginForm.value);
    this.svc.login(this.loginForm.value).subscribe(
      (response) => {console.log("succsess",response);
     localStorage.setItem('imageUrl', response['imageUrl'])
      localStorage.setItem('token',response['id'])
      localStorage.setItem('userId',response['userId'])
      localStorage.setItem('email',response['email'])
      this.openSnackBar();
      this.router.navigate(['/dashboard']);
      
      
    //this.Auth.setLoggedIn(true) 
  },
      (error) =>{ console.log("error",error);
      this.openSnackBarError();
      }
      
    )
    
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.view.sendMessage(this.data);
}
email = new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]);
getErrorMessageEmail() {
  return this.email.hasError('required') ? 'Not a valid email' : this.email.hasError('email') ? 'Not a valid email' :'';
}

password = new FormControl('', [Validators.required,Validators.minLength(6)]);
getErrorMessagePassword() {
  return this.password.hasError('required') ? 'password should be of minimum 6 characters' : this.password.hasError('password') ? 'password should be of minimum 6 characters' :'';
}
}