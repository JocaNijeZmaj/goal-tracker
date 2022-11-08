import { Component, OnInit } from '@angular/core';
import { UpdateUser, User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { slideInAnimation } from './route-animations';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [slideInAnimation]
})
export class UserComponent implements OnInit {

  
  updatePosition = false;
  user! : User;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.currentUser;
    this.loginService.userUpdate.subscribe((response: UpdateUser)=>{
      this.user.position = response.myPosition;
      localStorage.setItem("userData", JSON.stringify(this.user));
    })
    console.log(this.user)
  }
  updateUserInfo(){
    const updateUser: UpdateUser = {
      id: "",
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      myPosition: this.user.position,
      birthday: "",
    }
    this.loginService.updateUserData(updateUser);
    this.updatePosition = !this.updatePosition
  }
}
