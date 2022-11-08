import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy.service';
import { NotFoundComponent } from './login/not-found/not-found.component';


const routes: Routes = [
  {
    path : 'sign-in',
    loadChildren:() => import('./login/login.module').then(l => l.LoginModule),
  },
  {
    path :'admin' ,
    loadChildren:() => import('./admin/admin.module').then(a => a.AdminModule)
  },
  {
    path : '',
    loadChildren:()=>import('./home/home.module').then(h=>h.HomeModule),
    data : {preload : true}
  },
  {path :'not-found' , component : NotFoundComponent },
  {path :'**', redirectTo : 'not-found'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy : CustomPreloadingStrategy
    }
    )],
  exports: [RouterModule],
  providers : [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
