import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewUser, User } from 'src/app/entities';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit,OnDestroy {

  isMember = false ; 
  isAddedSuccessfully = false; 
  searchedText = '';
  selectedManager! : User | null ; 
  users! : User[];
  addedUserSubscription! : Subscription ;
  selectRequired = true;
  

  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
  this.adminService.getUsers().subscribe((response : User[])=>{
      this.users = response ;
    })

    this.addedUserSubscription = this.adminService.onAddedUser.subscribe((newUser : NewUser)=>{
      this.isAddedSuccessfully = true ; 
    })
  }
  onSelectedManager(user : User){
      console.log(user); 
      this.selectedManager = user;
      this.selectRequired = true;
  }
  
  onCheckedMember(){
    this.isMember = !this.isMember;
    this.selectedManager = null;
    this.selectRequired = !this.selectRequired;
  }

  onCreateNewUser(form : NgForm){
    const newUserEmail = form.controls["email"].value ; 
    const newUser : NewUser = {
      email : newUserEmail, 
      managerEmail : this.selectedManager ? this.selectedManager.email : ''
    };
    
    this.adminService.createNewUser(newUser);
    form.reset();
  }
  toggleIsAdded(){
    this.isAddedSuccessfully = false;
    this.isMember = false ;
    this.selectedManager = null ;
    this.searchedText = '';
    this.selectRequired = true;
  }
  changeUserAdded(){
    this.isAddedSuccessfully = false;
    this.selectedManager = null ;
    this.selectRequired = false;
  }

  ngOnDestroy(): void {
    this.addedUserSubscription?.unsubscribe();
  }
}
