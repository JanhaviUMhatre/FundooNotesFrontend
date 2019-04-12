import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login.model';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { MatSnackBar } from '@angular/material';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit {
  details: any;
  user: LoginModel = new LoginModel();
  data: any;
  servicename: string;
  info: string;
  breakpoint: number;
  baseUrl = environment.baseUrl;

  constructor(private view: ViewService, private snackBar: MatSnackBar, private cart: CartService,

    private svc: UserServiceService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }
  loginForm = this.formBuilder.group({
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    password: [this.user.password, [Validators.required,
    Validators.minLength(6)]],
    cartId: [localStorage.getItem('cartId')]

  });
  ngOnInit() {
    this.getJson()
    this.cart.cards.subscribe(info => this.info = info)
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 2;
  }
  getJson() {
    this.http.get(this.baseUrl + 'user/service').subscribe(
      (Response) => {

        this.details = Response['data']['data']
        this.servicename = this.info['name']

      },
      (error) => {

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
  onSubmit() {


    this.svc.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('imageUrl', response['imageUrl'])
        localStorage.setItem('token', response['id'])
        localStorage.setItem('userId', response['userId'])
        localStorage.setItem('email', response['email'])
        this.openSnackBar();
        this.router.navigate(['/dashboard']);


      },
      (error) => {

        this.openSnackBarError();
      }

    )

  }

  sendMessage(): void {
    this.view.sendMessage(this.data);
  }
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]);
  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'Not a valid email' : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should be of minimum 6 characters' : this.password.hasError('password') ? 'password should be of minimum 6 characters' : '';
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 2;
  }

}

