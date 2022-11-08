import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditGoal, Goal, GoalStatus, GoalType, Task } from 'src/app/entities';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-personal-goals',
  templateUrl: './personal-goals.component.html',
  styleUrls: ['./personal-goals.component.css']
})
export class PersonalGoalsComponent implements OnInit, OnDestroy {

  showComplitedGoals = true; 
  showActiveGoals = true ;
  showPendingGoals = true;
  getActiveSubscription! : Subscription ;
  getCompletedSubscription! : Subscription ;
  goalType = GoalType.Personal; 
  activeGoals! : Goal[]
  complitedGoals! : Goal[];

  constructor(private goalService : GoalService) { }

  ngOnInit(): void {
    this.getGoals();

    this.goalService.goalUpdate.subscribe((goal:EditGoal)=>{
      this.getGoals();
    });
  }
  getGoals(){
    this.getActiveSubscription = this.goalService.getGoals(this.goalType,GoalStatus.Active).subscribe(
      (goals : Goal[])=>{
       this.activeGoals = goals; 
    })
    
    this.getCompletedSubscription = this.goalService.getGoals(this.goalType,GoalStatus.Completed).subscribe(
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
    this.getCompletedSubscription?.unsubscribe();
  }
}
