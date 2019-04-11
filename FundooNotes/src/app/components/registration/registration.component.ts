
// ***********************************************************************************
// * Purpose: registration component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 9-2-2019
// *
// ***********************************************************************************
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, Route } from '@angular/router'


import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { RegisterModel } from 'src/app/models/register.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { NewregisterComponent } from '../newregister/newregister.component';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  isActive = false;
  service: any;
  inforeg: any;
  servicename: any;
  info: any;

  constructor(private cart: CartService, private uservice: UserServiceService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.cart.cards.subscribe(info => this.info = info)
    this.getservice()
  }

  getservice() {
    this.servicename = this.info['name']
  }
  registrationForm = this.formBuilder.group({
    firstName: [this.user.firstName, Validators.required],
    lastName: [this.user.lastName, Validators.required],
    password: [this.user.password, [Validators.required,
    Validators.minLength(6)]],
    confirmPassword: [null, Validators.required],
    phoneNumber: [this.user.phoneNumber, [Validators.required,
    Validators.maxLength(10), Validators.minLength(10)]],

    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    service: [localStorage.getItem('serviceType')]


  });
  onSubmit() {
    this.uservice.registration(this.registrationForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
      }

    )
  }
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required,
  Validators.maxLength(10), Validators.minLength(10)]);
  getErrorMessage() {
    return this.firstName.hasError('required') ? 'Please enter your firstname' : '';
  }
  getErrorMessageLast() {
    return this.lastName.hasError('required') ? 'Please enter your lastname' : '';
  }
  getErrorMessageNumber() {
    return this.phoneNumber.hasError('required') ? 'Please enter your 10 digit number' :
      this.phoneNumber.hasError('phoneNumber') ? 'Please enter 10 digit number' : '';
  }
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]);
  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'Not a valid email' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should be of minimum 6 characters' : this.password.hasError('password') ? 'password should be of minimum 6 characters' : '';
  }
  getErrorPasswordConfirm() {
    if (this.password! = this.confirmPassword) {
      return this.confirmPassword.hasError('confirmPassword') ? 'password is not matching' : '';
    }

  }


  receiveMessage($event) {
    this.service = $event
  }
}
