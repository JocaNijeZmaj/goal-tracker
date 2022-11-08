import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit,OnDestroy {

  teamArray! : User[];
  searchText = '';
  getTeamSubscription! : Subscription;

  constructor(
     private router : Router,
     private teamService : TeamService,
     private loginService : LoginService
     ) { }


  ngOnInit(): void {
    this.getTeamSubscription = this.teamService.getTeamMembers().subscribe({
      next: (response : User[]) => {
        console.log(response);
        this.teamArray = response ;
    },
    error: error => {
        console.error('There was an error!', error);
    }
    });
  }

  navigateToMember(selectedMember : User){
    console.log("member selected");
    console.log(selectedMember);
    this.teamService.selectedMember = selectedMember;
    this.loginService.selectedMember = selectedMember;
    this.router.navigate(['/my-team',selectedMember.email,'status'])
  }

  ngOnDestroy(): void {
    this.getTeamSubscription?.unsubscribe();
  }
}
