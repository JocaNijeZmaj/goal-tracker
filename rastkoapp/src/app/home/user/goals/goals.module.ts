import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { GoalService } from './services/goal.service';
import { PersonalGoalsComponent } from './personal-goals/personal-goals.component';
import { BusinessGoalsComponent } from './business-goals/business-goals.component';
import { GoalComponent } from './goal/goal.component';
import { AddGoalComponent } from './add-goal/add-goal.component';



@NgModule({
  declarations: [
    PersonalGoalsComponent,
    BusinessGoalsComponent,
    GoalComponent,
    AddGoalComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports : [
    GoalComponent
  ],
  providers : [
    GoalService,
  ]
})
export class GoalsModule { }
