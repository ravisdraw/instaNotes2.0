import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  constructor(private router: Router) {}

  goToWelcome() {
    this.router.navigate(['/welcome-page']);
  }


}
