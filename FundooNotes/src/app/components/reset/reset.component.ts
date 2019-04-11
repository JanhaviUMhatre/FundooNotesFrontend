import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ResetModel } from 'src/app/models/reset.model';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  user: ResetModel = new ResetModel();
  responseMsg: any;
  isActive = false;

  constructor(private snackBar: MatSnackBar, private svc: UserServiceService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }
  resetForm = this.formBuilder.group({
    //confirm password validation
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]]
  });
  ngOnInit() {
  }
  onSubmit() {
    this.svc.reset(this.resetForm.value).subscribe(
      (response) => {
        this.responseMsg = "Set password link sent to you registered email, please check.";
      },
      (error) => {
      }

    )

  }
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]);

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'Not a valid email' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
