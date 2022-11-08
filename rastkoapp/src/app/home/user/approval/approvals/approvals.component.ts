import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Goal } from 'src/app/entities';
import { GoalService } from '../../goals/services/goal.service';
import { ApprovalService } from '../services/approval.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit,OnDestroy {


  requestedGoalsSubscription! : Subscription;
  showTasks = false ;
  showPopup = false ;
  requestedGoals! : Goal[]
  canceledGoal! : Goal;

  constructor(private approvalService : ApprovalService, private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.route.data.subscribe((data: Data)=>{
      this.requestedGoals = data['approvalResolver'];
      console.log(this.requestedGoals);
    })

    this.approvalService.cancelGoal.subscribe((goal:  Goal)=>{
      this.cancelGoal(goal);
      this.getGoals();
    })
    this.approvalService.acceptGoal.subscribe((goal : Goal)=>{
      this.getGoals();
    })
  }
  getGoals(){
    this.requestedGoalsSubscription = this.approvalService.getRequestedGoals().subscribe((goals : Goal[])=>{
      this.requestedGoals = goals;
      console.log(goals);
    })
  }

  cancelGoal(goal : Goal){
    this.canceledGoal = goal;
    this.showPopup = true ;
  }

  ngOnDestroy(): void {
    this.requestedGoalsSubscription?.unsubscribe();
  }



}
