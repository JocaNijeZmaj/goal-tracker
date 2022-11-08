import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles, User } from '../entities';
import { LoginService } from '../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCanActivateGuard implements CanActivate {

constructor(private loginService: LoginService, private router : Router) { }

  canActivate():boolean{
  
    if(!this.loginService.isUserLoggedIn){
      this.router.navigate(['/sign-in']);
      return false ;
    }
    const user = this.loginService.currentUser; 

    if(!user || user.role !== Roles.Admin){
      this.router.navigate(['/sign-in']);
      return false ;
    }
    else{
      return true ;
    }
    
  }
  
}
