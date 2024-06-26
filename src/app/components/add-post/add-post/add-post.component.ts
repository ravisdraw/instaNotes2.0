import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {

  obj : any = {
    url : '',
    title : '',
    category : '',
    keywords : '',
    notes : ''
  }

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home-page'], {queryParams : {data: JSON.stringify(this.obj)}});
  }

  selectedCategory(event:any) {
    let value = event.target.value;
    this.obj.category = value;
  }


}
