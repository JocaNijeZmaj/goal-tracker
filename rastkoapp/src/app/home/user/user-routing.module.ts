import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCanActivateGuard } from '../../_guards/user.can-activate.guard';
import { BusinessGoalsComponent } from './goals/business-goals/business-goals.component';
import { MeetingComponent } from './meetings/meeting/meeting.component';
import { PersonalGoalsComponent } from './goals/personal-goals/personal-goals.component';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
    {path : '' , component : UserComponent, canActivate : [UserCanActivateGuard], children: [
        { path: 'status', component : StatusComponent},
        { path: 'business-goals', component : BusinessGoalsComponent},
        { path: 'personal-goals', component : PersonalGoalsComponent},
        { path: 'one-on-one', component : MeetingComponent},
        { path: 'approvals',loadChildren : ()=> import('./approval/approval.module').then(a => a.ApprovalModule)}
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }