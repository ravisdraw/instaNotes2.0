import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {

  receivedData:any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['data']) {
        this.receivedData = JSON.parse(params['data']);
        console.log(this.receivedData);
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home-page']);
  }
}
