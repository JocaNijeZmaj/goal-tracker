import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, Roles, UpdateUser, User } from '../../entities';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  userUpdate = new Subject<UpdateUser>();

  private path : string = environment.apiGate;
  private helper = new JwtHelperService();
  isUserLoggedIn = false ;
  currentUser! : User ;
  updatedUser! : UpdateUser;
  selectedMember!: User;


  constructor(private http : HttpClient, private router : Router, private zone: NgZone ) { }

  signInWithGoogle(credentials : string){
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post(environment.apiGate+'login',
     JSON.stringify({credentials: credentials}),
     {headers : header}
    )
    .pipe(tap((response : any) =>{
        console.log(response);
          const jwtToken = response.token;

          const decodedToken = this.helper.decodeToken(jwtToken);

          const loggedUser : User = {
            email: decodedToken.email,
            firstName:decodedToken.firstName,
            lastName: decodedToken.lastName,
            role: decodedToken.role,
            manager: decodedToken.manager,
            birthday: decodedToken.birthday,
            picture: decodedToken.picture,
            position: decodedToken.position
            };
          this.zone.run(() => {
            switch (decodedToken.role) {
              case Roles.Admin:
                  loggedUser.role = Roles.Admin;
                  this.router.navigate(['/admin/home']);
                  break;
              case Roles.Employee:
                  loggedUser.role = Roles.Employee;
                  this.router.navigate(['/user/status']);
                  break;
               case Roles.Manager:
                  loggedUser.role = Roles.Manager;
                  this.router.navigate(['/user/status']);
                  break;
            }
          });


            this.currentUser = loggedUser;

            localStorage.setItem('token', jwtToken);
            localStorage.setItem('userData', JSON.stringify(loggedUser));

            this.isUserLoggedIn = true;
    }))
  }

  signOut(){
    this.isUserLoggedIn = false ;

    localStorage.removeItem('token');
    localStorage.removeItem('userData');


    this.currentUser = null as unknown as User ;

    window.location.reload();
    this.router.navigate(['/sign-in']);
  }

  autoSignIn(){
    const jwtToken = localStorage.getItem('token');
    if(!jwtToken){
        return;
    }
    const expirationDate = this.helper.getTokenExpirationDate(jwtToken);
    const isExpired = this.helper.isTokenExpired(jwtToken);
    console.log('is Expired' + isExpired);

    if(isExpired){
        this.signOut();
    }

    const userData = JSON.parse(localStorage.getItem('userData') as string);


    this.currentUser = userData;
    this.isUserLoggedIn = true;

    const timeLeft = (expirationDate as Date).getTime() - new Date().getTime();
    console.log('time left'+ timeLeft);

    this.autoSignOut(timeLeft);

  }

  autoSignOut(timeLeft:  number){
    setTimeout(()=>{
      this.signOut();
    }, timeLeft);
  }

  updateUserData(updatedUser :UpdateUser){
    console.log(updatedUser);
    this.http.put(this.path + `users/${this.currentUser.email}`, updatedUser).subscribe({
      next: response => {
          console.log(response);
          this.userUpdate.next(updatedUser);

      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }
}
