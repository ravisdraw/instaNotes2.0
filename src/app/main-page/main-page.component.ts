import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  searchText: string = 'What’s on your mind? Search Here';

  hideSearchIcon: boolean = false;
  isDarkMode = false;
  isDay: boolean = false;

  filterList: any[] = [
    'Coding',
    'Tech',
    'AI',
    'Drawing',
    'Songs',
    'Love',
    'Travel',
    'Coding',
    'Tech',
    'AI',
    'Drawing',
    'Songs',
    'Love',
    'Travel',
  ];

  instaID = '';

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateDayNight();
  }

  addPost() {
    this.dialog.open(AddPostComponent, {
      height: '600px',
      width: '650px',
      hasBackdrop:true
    });
  }

  commonURL = 'https://www.instagram.com/p/Ctq5NkItF7A/embed/';

  sanitizeUrl(): SafeResourceUrl {
    var url = `https://www.instagram.com/p/${this.instaID}/embed/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  captureSearchText() {
    // console.log(this.searchText);
  }

  updateDayNight() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    // Consider it day if the hour is between 6 AM and 6 PM
    this.isDay = currentHour >= 6 && currentHour < 18;
    if (this.isDay) {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }

    this.toggleDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (typeof document !== 'undefined') {
      // Your code that accesses document here
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    }
  }

  inputFocused() {
    this.searchText = '';
    this.hideSearchIcon = true;
  }

  inputBlur() {
    this.searchText = 'What’s on your mind? Search Here';
    this.hideSearchIcon = false;
  }

  viewAllBtn() {
    alert('view-all');
  }
}
