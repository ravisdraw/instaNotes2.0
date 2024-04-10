import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './sign-in/welcome-page/welcome-page/welcome-page.component';
import { WelcomeLoadingPageComponent } from './sign-in/welcome-loading-page/welcome-loading-page.component';
import { SignInRoutingModule } from './sign-in/sign-in/sign-in-routing.module';
import { SignInModule } from './sign-in/sign-in/sign-in.module';
import { SignUpComponent } from './sign-up/sign-up/sign-up.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { ForgotPassComponent } from './forgot-pass/forgot-pass/forgot-pass.component';
import { WelcomePageModule } from './sign-in/welcome-page/welcome-page.module';
import { ForgotPassModule } from './forgot-pass/forgot-pass.module';
import { EmailVerificationComponent } from './email-verification/email-verification/email-verification.component';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { AddPostComponent } from './add-post/add-post/add-post.component';
import { AddPostModule } from './add-post/add-post.module';

@NgModule({
  imports: [
    CommonModule,
    SignInModule,
    SignUpModule,
    WelcomePageModule,
    ForgotPassModule,
    EmailVerificationModule,
    HomePageModule,
    AddPostModule
  ]
})
export class ComponentsModule {}
