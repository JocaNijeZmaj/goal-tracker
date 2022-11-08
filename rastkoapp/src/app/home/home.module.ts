import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MyTeamModule } from './my-team/my-team.module';
import { UserModule } from './user/user.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeRoutingModule } from './home-routing.module';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './logoutModal/modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamService } from './team/team.service';
import { CompanyComponent } from './company/company.component';
import { StatusModule } from './user/status/status.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    ModalComponent,
    TeamComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    UserModule,
    MyTeamModule,
    Ng2SearchPipeModule,
  ],
  providers : [
    TeamService
  ]
})
export class HomeModule { }
