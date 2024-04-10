import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private router: Router) {}

  goToWelcome() {
    this.router.navigate(['/welcome-page']);
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToEmailVerify() {
    this.router.navigate(['/email-verification']);
  }
}
