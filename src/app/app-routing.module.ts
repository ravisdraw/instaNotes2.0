import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/sign-in/welcome-page/welcome-page/welcome-page.component';
import { WelcomeLoadingPageComponent } from './components/sign-in/welcome-loading-page/welcome-loading-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch:'full'},
  {path: 'welcome', component:WelcomeLoadingPageComponent},
  {path: '' , loadChildren: ()=> import('./components/sign-in/welcome-page/welcome-page.module').then(m => m.WelcomePageModule)},
  {path: '' , loadChildren: ()=> import('./components/sign-in/sign-in/sign-in.module').then(m => m.SignInModule)},
  {path: '' , loadChildren: ()=> import('./components/sign-up/sign-up.module').then(m => m.SignUpModule)},
  {path: '' , loadChildren: ()=> import('./components/forgot-pass/forgot-pass.module').then(m => m.ForgotPassModule)},
  {path: '' , loadChildren: ()=> import('./components/email-verification/email-verification.module').then(m => m.EmailVerificationModule)},
  {path: '' , loadChildren: ()=> import('./components/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: '' , loadChildren: ()=> import('./components/edit-post/edit-post.module').then(m => m.EditPostModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
