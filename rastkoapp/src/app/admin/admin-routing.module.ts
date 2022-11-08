import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCanActivateGuard } from '../_guards/admin.can-activate.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { NewUserComponent } from './new-user/new-user.component';


const routes: Routes = [
    {path :'' , component : AdminComponent , canActivate : [AdminCanActivateGuard],children: [
        { path:'home', component : AdminHomeComponent },
        { path:'new-user', component: NewUserComponent }
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
