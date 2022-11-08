import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './login/not-found/not-found.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { LoginService } from './login/services/login.service';
import { TokenInterceptorService } from './login/services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LoginModule,
    AdminModule,
    HomeModule
  ],
  providers: [
    LoginService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
