import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(private router: Router) {}

  goToWelcome() {
    this.router.navigate(['/welcome-page']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  goToForgotPass() {
    this.router.navigate(['/forgot-password']);
  }

  goToHomePage() {
    this.router.navigate(['/home-page']);
  }


}
