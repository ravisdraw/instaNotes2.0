import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor( private router : Router) {};

  searchText:string = "";
  panelOpenState = false;

 posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      category: "Love",
      keywords: "pure, dream, marriage",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
   ]

   goToAddPost() {
    this.router.navigate(['/add-post']);
  }

}
