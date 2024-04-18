import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInModule } from './sign-in/sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { WelcomePageModule } from './sign-in/welcome-page/welcome-page.module';
import { ForgotPassModule } from './forgot-pass/forgot-pass.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { HomePageModule } from './home-page/home-page.module';
import { AddPostModule } from './add-post/add-post.module';
import { EditPostModule } from '././edit-post/edit-post.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignInModule,
    SignUpModule,
    WelcomePageModule,
    ForgotPassModule,
    EmailVerificationModule,
    HomePageModule,
    AddPostModule,
    EditPostModule,
    ReactiveFormsModule
  ],
})
export class ComponentsModule {}
