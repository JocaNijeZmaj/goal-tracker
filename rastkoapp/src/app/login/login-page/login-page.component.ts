import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private signInSubsription! : Subscription;
  constructor(private loginService : LoginService) { }


  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = ()=>{
      window.google.accounts.id.initialize(
        {
          client_id : environment.clientId,
          callback : this.handleCredentialResponse.bind(this),
          auto_select : false,
          cancel_on_tap_outside : true
        }
      )

      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("googleButton"),
        { theme: "outline", size: "large", width: "100%", type: "standard", text : 'signin_with'}
        );

      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});

    }
  }


  handleCredentialResponse(response : CredentialResponse){

    this.signInSubsription =  this.loginService.signInWithGoogle(response.credential).subscribe({
      next: (response : any)=>{
        console.log(response);

      },
      error: (e :Error)=>{
        console.log(e);
        alert("Problem sa prijavljivanjem");
      }

    });

  }

  ngOnDestroy(): void {
    this.signInSubsription?.unsubscribe();
  }
}
