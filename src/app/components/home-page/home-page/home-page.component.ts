import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit{

  receivedData:any;

  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['data']) {
        this.receivedData = JSON.parse(params['data']);
        this.posts.push(this.receivedData);
      }
    });
  }

  searchText: string = '';
  panelOpenState = false;

  posts = [
    {
      id: 'C5Kf7PZSpyy',
      url: 'https://www.instagram.com/reel/C5Kf7PZSpyy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      title: 'Create UI Design using AI',
      category: 'AI',
      keywords: 'ai,tech,figma,ui,design',
      notes:
        'With simple clicks you can create UI designs and also generate ai',
    },
    {
      id: 'C44O7cDvcdL',
      url: 'https://www.instagram.com/reel/C44O7cDvcdL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      title: 'Making Crispy Corn',
      category: 'Food',
      keywords: 'food,cooking,snack',
      notes: '',
    },
  ];

  goToAddPost() {
    this.router.navigate(['/add-post']);
  }

  goToInstagramPost(url: string) {
    window.open(url, 'blank');
  }

  goToEditPost(obj:any) {
    this.router.navigate(['/edit-post'], {queryParams: { data: JSON.stringify(obj)}});
  }

  copyToClipboard(url:string) {
    this.clipboardService.copy(url);
    alert("Post URL Copied to Clipboard!")
  }
  deletePost(id:string) {
    this.posts = this.posts.filter(item => item.id !== id);
  }
  
}
