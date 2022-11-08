import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showText = false;
  user! : User ;
  @Output() openModal = new EventEmitter<boolean>();
  
  constructor(private loginService : LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.currentUser; 
  }
  
  openLogoutPopUp(){
    console.log("emit")
    this.openModal.emit(true);
  }
}
