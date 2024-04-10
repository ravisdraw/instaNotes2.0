import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit{

  isWelcomeLoaded: boolean = true;

  constructor( private router: Router) {};

  ngOnInit(): void {
    setTimeout(() => {
      this.isWelcomeLoaded = false;
    }, 2000); 
  }
  

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

}
