import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, Task } from 'src/app/entities';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-business-goals',
  templateUrl: './business-goals.component.html',
  styleUrls: ['./business-goals.component.css']
})
export class BusinessGoalsComponent implements OnInit, OnDestroy {

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

  constructor(private goalService : GoalService) { }

  ngOnInit(): void {
    this.getGoals();

    this.goalService.goalUpdate.subscribe((goal:EditGoal)=>{
      this.getGoals();
    });
  }
  getGoals(){
    this.getActiveSubscription = this.goalService.getGoals(GoalType.Business,GoalStatus.Active).subscribe(
      (goals : Goal[])=>{
       this.activeGoals = goals; 
    })
    this.getPendingSubscription = this.goalService.getGoals(GoalType.Business,GoalStatus.Pending).subscribe(
      (goals : Goal[])=>{
       this.pendingGoals = goals; 
    })
    this.getCompletedSubscription = this.goalService.getGoals(GoalType.Business,GoalStatus.Completed).subscribe(
      (goals : Goal[])=>{
       this.complitedGoals = goals; 
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
