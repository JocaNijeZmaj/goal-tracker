import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { Roles } from '../entities';
import { LoginService } from '../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserCanActivateGuard implements CanActivate {

  
  constructor(private loginService: LoginService, private router : Router) {}

  canActivate(): boolean{
    
    const user = this.loginService.currentUser; 

    if(!user) {
      this.router.navigate(['/sign-in']);
      return false ;
    }
    else{
      return true ;
    }
  }
  
}
