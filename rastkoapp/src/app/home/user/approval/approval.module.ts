import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApprovalModalComponent } from './approval-modal/approval-modal.component';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalService } from './services/approval.service';
import { ApprovalGoalComponent } from './approval-goal/approval-goal.component';
import { ApprovalResolver } from './services/approval.resolver';


@NgModule({
  declarations: [
    ApprovalsComponent,
    ApprovalModalComponent,
    ApprovalGoalComponent
  ],
  imports: [
  CommonModule,
   RouterModule,
   FormsModule,
   ApprovalRoutingModule
  ],
  providers: [ApprovalService, ApprovalResolver]
})
export class ApprovalModule { }
