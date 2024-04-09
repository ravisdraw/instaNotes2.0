import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './sign-in/welcome-page/welcome-page.component';
import { WelcomeLoadingPageComponent } from './sign-in/welcome-loading-page/welcome-loading-page.component';
import { SignInRoutingModule } from './sign-in/sign-in/sign-in-routing.module';
import { SignInModule } from './sign-in/sign-in/sign-in.module';
import { SignUpComponent } from './sign-up/sign-up/sign-up.component';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignInModule,SignUpModule],
})
export class ComponentsModule {}
