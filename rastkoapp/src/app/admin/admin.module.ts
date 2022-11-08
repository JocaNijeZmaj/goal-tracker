import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdminComponent,
    NewUserComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
