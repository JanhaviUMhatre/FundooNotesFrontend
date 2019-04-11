import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/models/forgotPassword.model';

import { UserServiceService } from 'src/app/services/userServices/user-service.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  isActive = false;

  user: ForgotPassword = new ForgotPassword();


  constructor(private snackBar: MatSnackBar, private svc: UserServiceService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }
  passwordForm = this.formBuilder.group({
    password: [this.user.password, [Validators.required,
    Validators.minLength(6)]]
  });


  ngOnInit() {


  }
  onSubmit() {


    this.svc.resetpassword(this.passwordForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
      }

    )

  }
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should be of minimum 6 characters' : this.password.hasError('password') ? 'password should be of minimum 6 characters' : '';
  }
}