import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit{

  constructor( private router: Router) {};

  ngOnInit(): void {
   
  }
  

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

}
