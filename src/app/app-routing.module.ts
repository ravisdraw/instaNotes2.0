import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/sign-in/welcome-page/welcome-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch:'full'},
  {path: 'welcome', component:WelcomePageComponent},
  {path: 'insta-notes' , loadChildren: ()=> import('./components/sign-in/sign-in/sign-in.module').then(m => m.SignInModule)},
  {path: 'insta-notes' , loadChildren: ()=> import('./components/sign-up/sign-up.module').then(m => m.SignUpModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
