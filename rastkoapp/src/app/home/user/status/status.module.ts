import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoalsModule } from '../goals/goals.module';
import { MeetingModule } from '../meetings/meeting.module';
import { StatusComponent } from './status.component';


@NgModule({
  declarations: [
    StatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MeetingModule,
    GoalsModule
   
  ],
  providers: []
})
export class StatusModule { }