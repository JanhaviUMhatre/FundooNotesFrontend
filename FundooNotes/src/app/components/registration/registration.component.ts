
// ***********************************************************************************
// * Purpose: registration component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 9-2-2019
// *
// ***********************************************************************************
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { Router, Route } from '@angular/router'


import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { RegisterModel } from 'src/app/models/register.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  isActive = false;

  constructor( private uservice : UserServiceService,private router: Router,private formBuilder:FormBuilder) { }
  
  registrationForm = this.formBuilder.group({
    //confirm password validation
firstName : [this.user.firstName,Validators.required],
lastName : [this.user.lastName,Validators.required],
password : [this.user.password, [Validators.required, // password validation
Validators.minLength(6)]],
confirmPassword : [null, Validators.required],
phoneNumber : [this.user.phoneNumber, [Validators.required, //phone number validation
Validators.maxLength(10), Validators.minLength(10)]],
//email validation
email : [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
service : [this.user.service, Validators.required]
 
});
  ngOnInit() {
   
       
    }
    onSubmit(){
      console.log(this.registrationForm.value);
      this.uservice.registration(this.registrationForm.value).subscribe(
        (response) => {console.log("succsess",response);
        this.router.navigate(['/login']);},
        (error) =>{ console.log("error",error);
        }
        
      )
    }
     firstName = new FormControl('', [Validators.required]);
     lastName = new FormControl('', [Validators.required]);
     phoneNumber = new FormControl ('', [Validators.required, //phone number validation
       Validators.maxLength(10), Validators.minLength(10)]);
    getErrorMessage() {
       return this.firstName.hasError('required') ? 'Please enter your firstname' :'';
    }
     getErrorMessageLast() {
       return this.lastName.hasError('required') ? 'Please enter your lastname' :'';
    }
     getErrorMessageNumber() {
      return this.phoneNumber.hasError('required') ? 'Please enter your 10 digit number' : 
      this.phoneNumber.hasError('phoneNumber') ? 'Please enter 10 digit number' :'';
     }
    email = new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]);
getErrorMessageEmail() {
  return this.email.hasError('required') ? 'Not a valid email' : this.email.hasError('email') ? 'Not a valid email' :'';
}
password = new FormControl('', [Validators.required,Validators.minLength(6)]);
confirmPassword = new FormControl('', [Validators.required,Validators.minLength(6)]);
getErrorMessagePassword() {
  return this.password.hasError('required') ? 'password should be of minimum 6 characters' : this.password.hasError('password') ? 'password should be of minimum 6 characters' :'';
}
getErrorPasswordConfirm(){
  if(this.password ! = this.confirmPassword){
      return this.confirmPassword.hasError('confirmPassword') ? 'password is not matching' : '';
  }
  
}

}
