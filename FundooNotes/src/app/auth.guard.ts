import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/AuthGuard/auth.service';
import { HttpService } from './services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router: Router,private http:HttpService){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //  if (localStorage.getItem('token')) {
        // logged in so return true
        //return this.auth.isLoggedIn;
      // return false
      if(this.http.loggIn()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login']);
    // return false;
    
  //}
}