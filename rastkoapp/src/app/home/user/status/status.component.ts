import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Goal, GoalStatus, GoalType, Meeting, MeetStatus } from 'src/app/entities';
import { MeetingService } from '../meetings/services/meeting.service';
import { GoalService } from '../goals/services/goal.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit,OnDestroy {

  showBusinessGoals = true ;
  showPersonalGoals = true ;
  showActiveMeets = true; 

  businessGoals! : Goal[];
  personalGoals! : Goal[];
  activeMeets! : Meeting[];
  getbusinessSubscription! : Subscription ;
  getpersonalSubscription! : Subscription ;


  constructor(private goalService : GoalService, private meetService: MeetingService) { }

  ngOnInit(): void {
    this.getGoals();

    this.meetService.getMeetings(MeetStatus.Active).subscribe((response : Meeting[])=>{
      console.log(response);
      this.activeMeets = response; 
     })
  }

  getGoals(){
    this.getbusinessSubscription = this.goalService.getGoals(GoalType.Business,GoalStatus.Active).subscribe(
      (goals : Goal[])=>{
       this.businessGoals = goals; 
    })
    this.getpersonalSubscription = this.goalService.getGoals(GoalType.Personal,GoalStatus.Active).subscribe(
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
  toggleActiveMeets(isShowed : boolean) : void{
    this.showActiveMeets = isShowed; 
  }

  ngOnDestroy(): void {
   this.getbusinessSubscription.unsubscribe(); 
   this.getpersonalSubscription.unsubscribe(); 
  }

}
