import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCanActivateGuard } from '../_guards/home.can-activate.guard';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
    {path : '', component : HomeComponent,canActivate:[HomeCanActivateGuard], children:[
    
        {path : 'user', loadChildren : ()=> import('./user/user.module').then(u => u.UserModule)},
    
        { path: 'my-team', loadChildren : ()=> import('./my-team/my-team.module').then(mt => mt.MyTeamModule) },

        { path: 'company', component : CompanyComponent },

        {path : 'team', component : TeamComponent}
      
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }