import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, User } from 'src/app/entities';
import { LoginService } from 'src/app/login/services/login.service';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.css']
})
export class MemberStatusComponent implements OnInit,OnDestroy {

  showBusinessGoals = true ;
  getBusinessSubscription! : Subscription ;
  businessGoals! : Goal[];
  showPersonalGoals = true ;
  getPersonalSubscription! : Subscription ;
  personalGoals! : Goal[];
  selectedMember! : User ;

  constructor(private myTeamService : MyTeamService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.selectedMember = this.loginService.selectedMember;

    this.getGoals();

    this.myTeamService.goalUpdate.subscribe((goal:EditGoal)=>{
      this.getGoals();
    });

    this.myTeamService.addedGrade.subscribe((res : boolean)=>{
      this.getGoals();
    })
  }

  getGoals(){
    this.getBusinessSubscription = this.myTeamService
      .getGoals(GoalType.Business,GoalStatus.Active,this.selectedMember.email).subscribe(
        (goals : Goal[])=>{
          console.log(this.selectedMember.email);
          console.log("get business");
          this.businessGoals = goals;
        })

    this.getBusinessSubscription = this.myTeamService
  .getGoals(GoalType.Personal,GoalStatus.Active,this.selectedMember.email).subscribe(
    (goals : Goal[])=>{
      this.personalGoals = goals;
    })
  }

  toggleBusinessGoals(isShowed : boolean) : void{
    this.showBusinessGoals = isShowed;
  }
  togglePersonalGoals(isShowed : boolean) : void{
    this.showPersonalGoals = isShowed;
  }

  ngOnDestroy(): void {
    this.getBusinessSubscription?.unsubscribe();
    this.getPersonalSubscription?.unsubscribe();
  }


}
