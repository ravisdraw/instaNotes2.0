import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  constructor( private router : Router) {};

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
