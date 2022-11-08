import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private checkAsyncLogout = false;
  private helper = new JwtHelperService();

  constructor(
    private loginService : LoginService, private router : Router) { }

  localStorageCheck(){
    const jwtToken = localStorage.getItem('token');
    if(!jwtToken){
      this.checkAsyncLogout = true;
    }
    const isExpired = this.helper.isTokenExpired(jwtToken as string);

    if(isExpired){
      this.checkAsyncLogout = true;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.loginService.isUserLoggedIn){
      return next.handle(req);
    }

    this.localStorageCheck()

    if(this.checkAsyncLogout){
      this.router.navigate(['/sign-in']);
      window.location.reload();
      return next.handle(req);
    }

    const jwtToken = localStorage.getItem('token');

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + jwtToken as string);

    const modifiedReq = req.clone({
      headers : headers
    });

    this.checkAsyncLogout = false;
    return next.handle(modifiedReq);
  }
}
