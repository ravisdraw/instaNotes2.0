import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  receivedData: any;
  searchText: string = '';
  panelOpenState: boolean = false;
  editMode: boolean = false;
  robots: any;

  filters: any[] = ['AI', 'Tech', 'Love'];

  posts: any[] = [
    // {
    //   id: 'C5Kf7PZSpyy',
    //   url: 'https://www.instagram.com/reel/C5Kf7PZSpyy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    //   title: 'Create UI Design using AI',
    //   category: 'AI',
    //   keywords: 'ai,tech,figma,ui,design',
    //   notes:
    //     'With simple clicks you can create UI designs and also generate ai',
    // },
    // {
    //   id: 'C44O7cDvcdL',
    //   url: 'https://www.instagram.com/reel/C44O7cDvcdL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    //   title: 'Making Crispy Corn',
    //   category: 'Food',
    //   keywords: 'food,cooking,snack',
    //   notes: '',
    // },
  ];

  instaID = '';
  instaUrl: SafeResourceUrl = '';

  commonURL = 'https://www.instagram.com/p/Ctq5NkItF7A/embed/';
  myForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.receivedData = JSON.parse(params['data']);
        this.posts.push(this.receivedData);
      }
    });
    this.getMasterList();
    this.createForm();
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  createForm() {
    this.myForm = this.fb.group({
      items: this.fb.array([]), // Initialize items as a FormArray
    });
  }

  getItems() {
    return (this.myForm?.get('items') as FormArray).controls; // Cast to FormArray and access controls
  }

  addItem(obj: any) {
    const newItem = this.fb.group({
      title: [obj.title],
      category: [obj.category],
      keywords: [obj.keywords],
      note: [obj.note],
      collectionId: [obj.collectionId],
    });
    (this.myForm?.get('items') as FormArray).push(newItem); // Cast to FormArray and push new item
  }

  removeItem(index: number) {
    (this.myForm?.get('items') as FormArray).removeAt(index); // Cast to FormArray and remove item at index
  }

  sanitizeUrl(): SafeResourceUrl {
    var url = `https://www.instagram.com/p/${this.instaID}/embed/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getMasterList() {
    this.dataService
      .getMasterListStartingFromIndex(0, 2)
      .subscribe((item: any) => {
        item.forEach((post: any) => {
          this.posts.push(post);
          this.addItem(post);
        });
        // console.log(this.myForm);
      });
  }

  goToAddPost() {
    // this.router.navigate(['/add-post']);
    if (this.myForm.dirty) {
      let formArray = this.myForm.get('items') as FormArray;
      formArray.controls.forEach((formGroup: any) => {
        let obj = {
          title: '',
          category: '',
          keywords: '',
          note: '',
          collId: '',
        };
        if (formGroup.dirty) {
          obj.title = formGroup.value['title'];
          obj.category = formGroup.value['category'];
          obj.keywords = formGroup.value['keywords'];
          obj.note = formGroup.value['note'];
          obj.collId = formGroup.value['collectionId'];
          this.updatePost(obj);
        }
      });
    } else {
      this.addPost();
    }
  }

  updatePost(obj: any) {
    let updateObj: any = this.posts.filter(
      (item: any) => item.collectionId === obj.collId
    );
    updateObj[0].title = obj.title;
    updateObj[0].category = obj.category;
    updateObj[0].keywords = obj.keywords;
    updateObj[0].note = obj.note;
    this.dataService
      .updateDocument(obj.collId, updateObj[0])
      .then(() => {
        this.showSuccess('Post updated Successfully')
        this.myForm.markAsPristine();
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  addPost() {
    this.dataService
    .addData();
    
  }

  goToInstagramPost(url: string) {
    window.open(url, 'blank');
  }

  showInstagramPost(id: string) {
    this.instaID = id;
    this.instaUrl = this.sanitizeUrl();
    this.panelOpenState = true;
  }

  goToEditPost(obj: any) {
    // this.router.navigate(['/edit-post'], {queryParams: { data: JSON.stringify(obj)}});
    this.editMode = true;
  }

  copyToClipboard(url: string) {
    this.clipboardService.copy(url);
    alert('Post URL Copied to Clipboard!');
  }
  deletePost(id: string) {
    this.posts = this.posts.filter((item) => item.id !== id);
  }

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
