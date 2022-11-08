import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberBusinessComponent } from './member-business/member-business.component';
import { MemberMeetingsComponent } from './member-meetings/member-meetings.component';
import { MemberPersonalComponent } from './member-personal/member-personal.component';
import { MemberStatusComponent } from './member-status/member-status.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
    { path: ':email', component : MemberComponent, children : [
      { path: 'status', component : MemberStatusComponent},
      { path: 'business', component : MemberBusinessComponent},
      { path: 'personal', component : MemberPersonalComponent},
      { path: 'meetings', component : MemberMeetingsComponent},
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule { }