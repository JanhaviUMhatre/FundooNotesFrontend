// ***********************************************************************************
// * Purpose: Admin login component.
// *
// * @author : Janhavi Mhatre
// * @python version 3.7
// * @platform : VS Code
// * @since 8-2-2019
// *
// ***********************************************************************************
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router'

import * as $ from 'jquery';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  user: LoginModel = new LoginModel();  // login model
  errorMsg: '';  //error message
  constructor(private formBuilder: FormBuilder, private svc: HttpService,
    private router: Router
  ) { }
  // taking form values using formBuilder
  loginForm = this.formBuilder.group({
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    password: ['']
  });
  ngOnInit() {

  }
  login() {

    this.svc.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem("token", response['id'])
        this.router.navigate(['/admindashboard']);
      },
      (error) => {
      this.errorMsg = error.statusText
      }
    )

  }

}
