import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoComponent } from './login-page/logo/logo.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: []
})
export class LoginModule { }
