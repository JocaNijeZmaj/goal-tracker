import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'rastkoapp';

  constructor(private loginService : LoginService) {}

  ngOnInit(): void {
    this.loginService.autoSignIn();
  }
}
