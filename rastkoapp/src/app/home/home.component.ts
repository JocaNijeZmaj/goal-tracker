import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  isModalOpen = false ;
  loggedUser! : User; 

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.loggedUser = this.loginService.currentUser; 
  }
  openModal(openModal : boolean){
    this.isModalOpen = openModal; 
  }
}
