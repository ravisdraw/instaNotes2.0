import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {

  constructor( private router : Router) {};

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

}
