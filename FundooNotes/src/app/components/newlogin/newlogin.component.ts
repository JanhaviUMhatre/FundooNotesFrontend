import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login.model';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { MatSnackBar } from '@angular/material';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit {
  details: any;
  user: LoginModel = new LoginModel(); //object of login model
  data:any;
  constructor(private view: ViewService,private snackBar: MatSnackBar,
    // private Auth : AuthService,
     private svc : UserServiceService,private router: Router,private formBuilder: FormBuilder,private http:HttpClient) { }
     loginForm = this.formBuilder.group({
      //confirm password validation
    email : [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    password : [this.user.password, [Validators.required, // password validation
      Validators.minLength(6)]],
    
    });
  ngOnInit() {
    this.getJson()
  }
  getJson(){
    this.http.get('http://34.213.106.173/api/user/service').subscribe(
      (Response)=>{console.log("success",Response);
      this.details=Response['data']['data']
      },
      (error)=>{console.log("error",error);
      }
    )
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

