import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/entities';
import { ApprovalService } from '../services/approval.service';

@Component({
  selector: 'app-approval-goal',
  templateUrl: './approval-goal.component.html',
  styleUrls: ['./approval-goal.component.css']
})
export class ApprovalGoalComponent implements OnInit {

  @Input() goal! : Goal;
  showTasks = false ; 

  constructor(private approvalService : ApprovalService) { }

  ngOnInit(): void {
  }
  approveGoal(goal : Goal){
    this.approvalService.approveGoal(goal).subscribe({
      next: response => {
        console.log(response);
        this.approvalService.acceptGoal.next(goal);
    },
    error: error => {
        console.error('There was an error!', error);
    }
    })
  
  }

  cancelGoal(){
    this.approvalService.cancelGoal.next(this.goal); 
  }
}
