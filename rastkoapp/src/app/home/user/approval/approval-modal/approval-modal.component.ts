import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from 'src/app/entities';
import { GoalService } from '../../goals/services/goal.service';
import { ApprovalService } from '../services/approval.service';

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.css']
})
export class ApprovalModalComponent implements OnInit {
  
  @Output() closePopUp = new EventEmitter<boolean>();
  @Input() canceledGoal! : Goal; 

  constructor(private approvalService : ApprovalService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closePopUp.emit(true);
  }

  declineGoal(){
    this.approvalService.declineGoal(this.canceledGoal).subscribe({
      next: response => {
        console.log(response);
        this.closeModal();
    },
    error: error => {
        console.error('There was an error!', error);
    }
    })
  }

}
