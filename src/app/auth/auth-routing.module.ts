import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SignUpComponent} from '../sign-up/sign-up.component';
import {SignInComponent} from '../sign-in/sign-in.component';


const appRoutes: Routes = [
  {path:'signup', component : SignUpComponent},
  {path:'signin', component : SignInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
