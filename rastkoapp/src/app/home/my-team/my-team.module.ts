import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MemberBusinessComponent } from './member-business/member-business.component';
import { MemberMeetingsComponent } from './member-meetings/member-meetings.component';
import { MemberPersonalComponent } from './member-personal/member-personal.component';
import { MemberStatusComponent } from './member-status/member-status.component';
import { MemberComponent } from './member/member.component';
import { MyTeamService } from './services/my-team.service';
import { MemberGoalComponent } from './member-goal/member-goal.component';
import { MemberAddGoalComponent } from './member-add-goal/member-add-goal.component';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MemberBusinessComponent,
    MemberPersonalComponent,
    MemberMeetingsComponent,
    MemberStatusComponent,
    MemberComponent,
    MemberGoalComponent,
    MemberAddGoalComponent
  ],
  imports: [
   CommonModule,
   RouterModule,
   FormsModule,
   Ng2SearchPipeModule,
   MyTeamRoutingModule
  ],
  providers: [MyTeamService]
})
export class MyTeamModule { }
