import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() closePopUp = new EventEmitter<boolean>();
  
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closePopUp.emit(true);
  }

  logout(){
    this.loginService.signOut();
  }
}
