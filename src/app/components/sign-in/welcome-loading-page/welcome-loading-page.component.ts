import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-loading-page',
  templateUrl: './welcome-loading-page.component.html',
  styleUrl: './welcome-loading-page.component.css'
})
export class WelcomeLoadingPageComponent implements OnInit {

  constructor( private router : Router) {};

  ngOnInit(): void {
    setTimeout(() => {
      this.goToWelcomePage();
    }, 2000); 
  }

  goToWelcomePage() {
    this.router.navigate(['/welcome-page'])
  }
  
}
