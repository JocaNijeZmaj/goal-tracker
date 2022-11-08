import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, User } from 'src/app/entities';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-member-business',
  templateUrl: './member-business.component.html',
  styleUrls: ['./member-business.component.css']
})
export class MemberBusinessComponent implements OnInit,OnDestroy {

  showComplitedGoals = true; 
  showActiveGoals = true ;
  showPendingGoals  = true;
  getActiveSubscription! : Subscription ;
  getPendingSubscription! : Subscription ;
  getCompletedSubscription! : Subscription ;
  goalType = GoalType.Business; 
  activeGoals! : Goal[];
  complitedGoals! : Goal[];
  pendingGoals! : Goal[];
  selectedMember! : User ;

  constructor(private myTeamService: MyTeamService ) { }

  ngOnInit(): void {
    this.selectedMember = this.myTeamService.selectedMember;

    this.getGoals();

    this.myTeamService.goalUpdate.subscribe((goal:EditGoal)=>{
      this.getGoals();
    });

    this.myTeamService.addedGrade.subscribe((res : boolean)=>{
      this.getGoals();
    })
  }
  getGoals(){
    this.getActiveSubscription = this.myTeamService
      .getGoals(GoalType.Business,GoalStatus.Active,this.selectedMember.email).subscribe(
        (goals : Goal[])=>{
          this.activeGoals = goals; 
        }) 
    this.getPendingSubscription = this.myTeamService
      .getGoals(GoalType.Business,GoalStatus.Pending,this.selectedMember.email).subscribe(
        (goals : Goal[])=>{
        this.pendingGoals = goals; 
        })
    this.getCompletedSubscription = this.myTeamService
      .getGoals(GoalType.Business,GoalStatus.Completed,this.selectedMember.email).subscribe(
        (goals : Goal[])=>{
        this.complitedGoals = goals;
        console.log(this.complitedGoals)
        })
  }

  toggleComplitedGoals(isShowed : boolean) : void{
    this.showComplitedGoals = isShowed ;
  }
  toggleActiveGoals(isShowed : boolean) : void{
    this.showActiveGoals = isShowed; 
  }
  togglePendingGoals(isShowed : boolean) : void{
    this.showPendingGoals = isShowed; 
  }
  ngOnDestroy(): void {
    this.getActiveSubscription?.unsubscribe();
    this.getPendingSubscription?.unsubscribe();
    this.getCompletedSubscription?.unsubscribe();
  }

}
