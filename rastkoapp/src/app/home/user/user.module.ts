import { NgModule } from '@angular/core';
import { PersonalGoalsComponent } from './goals/personal-goals/personal-goals.component';
import { BusinessGoalsComponent } from './goals/business-goals/business-goals.component';
import { GoalService } from './goals/services/goal.service';
import { GoalComponent } from './goals/goal/goal.component';
import { AddGoalComponent } from './goals/add-goal/add-goal.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { ApprovalModule } from './approval/approval.module';
import { CommonModule } from '@angular/common';
import { MeetingModule } from './meetings/meeting.module';
import { StatusModule } from './status/status.module';
import { GoalsModule } from './goals/goals.module';


@NgModule({
  declarations: [
    UserComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ApprovalModule,
    MeetingModule,
    StatusModule,
    GoalsModule
  ],
  exports : [
    
  ],
  providers : [
    GoalService,
  ]
})
export class UserModule { }
