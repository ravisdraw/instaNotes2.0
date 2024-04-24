import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { KeywordsService } from '../../../services/keywords.service';
import { ArrayToWordsPipe } from '../../../pipes/array-to-words.pipe';
import { WordsToArrayPipe } from '../../../pipes/words-to-array.pipe';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  animations: [
    trigger('onOff', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('200ms', style({ transform: 'scale(1) ', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('200ms', style({ transform: 'scale(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  receivedData: any;
  searchText: string = '';
  panelOpenState: boolean = false;
  editMode: boolean = true;
  robots: any;

  totalCount = 0;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  showFilter: boolean = false;

  selectedKeyword: string = '';

  pageEvent: PageEvent | undefined;
  collectionHistory = ['0'];
  avoidSearchRepeats: any[] = [];

  filters: any[] = [
    'Coding',
    'Dream',
    'Food',
    'Love',
    'Motivation',
    'Outfit',
    'Photography',
    'Songs',
    'Tech',
    'ToBuy',
    'Trading',
    'Travel',
    'UI',
  ];

  keywords: any[] = [];

  selectedCategory: string = '';

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
  searchKeyword: string = '';

  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private keywordService: KeywordsService,
    private arrayToWords: ArrayToWordsPipe,
    private wordToArray: WordsToArrayPipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.receivedData = JSON.parse(params['data']);
        this.posts.push(this.receivedData);
      }
    });
    // this.getMasterList(this.collectionHistory[this.pageIndex], this.pageSize);
    this.createForm();
    // this.getMasterListSize();
    this.getKeywordList();
  }

  getKeywordList() {
    this.keywordService.getKeywordList().subscribe((data: any) => {
      let keywordColl = data.data;
      keywordColl.forEach((item: any) => {
        this.keywords.push(item);
      });
    });
  }

  searchPost() {
    this.instaID = '';
    this.showFilter = false;
    this.posts = [];
    this.createForm();
    let lastItem = '';
    this.showFilter = false;
    this.dataService
      .getDocumentsByTitle(this.searchText)
      .subscribe((item: any) => {
        if (item.length == 0) {
          this.showWarning('No Data Found!');
        } else {
          this.toastr.clear();
        }
        item.forEach((post: any) => {
          if (!this.avoidSearchRepeats.includes(post.collectionId)) {
            this.avoidSearchRepeats.push(post.collectionId);
            this.posts.push(post);
            this.addItem(post);
            lastItem = post.collectionId;
          }
        });
        this.pageSize = item.length;
        this.collectionHistory.push(lastItem);
      });
  }

  getMasterListSize() {
    let count = this.dataService.getMasterListCount();
    count.then((data) => {
      this.totalCount = data;
      this.length = this.totalCount;
    });
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Warning');
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
      title: [this.arrayToWords.transform(obj.title)],
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

  getMasterList(startIndex: string, endIndex: number) {
    this.posts = [];
    this.createForm();
    let lastItem = '';
    this.dataService
      .getMasterListStartingFromIndex(startIndex, endIndex)
      .subscribe((item: any) => {
        item.forEach((post: any) => {
          this.posts.push(post);
          this.addItem(post);
          lastItem = post.collectionId;
        });
        this.collectionHistory.push(lastItem);
        // console.log(this.myForm);
      });
  }

  getCategoryList(startIndex: string, range: number, item: string) {
    this.posts = [];
    this.createForm();
    let lastItem = '';
    this.dataService
      .getMasterListByCategory(startIndex, range, item)
      .subscribe((item: any) => {
        item.forEach((post: any) => {
          this.posts.push(post);
          this.addItem(post);
          lastItem = post.collectionId;
        });
        this.collectionHistory.push(lastItem);
        // console.log(this.myForm);
      });
  }

  getCategory(item: string) {
    this.pageSize = 10;
    this.collectionHistory = ['0'];
    this.selectedCategory = item;
    this.dataService.getCategoryCount(item).then((data) => {
      this.totalCount = data;
      this.length = this.totalCount;
      this.getCategoryList(
        this.collectionHistory[this.pageIndex],
        this.pageSize,
        item
      );
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
    updateObj[0].title = this.wordToArray.transform(obj.title);
    updateObj[0].category = obj.category;
    updateObj[0].keywords = obj.keywords;
    updateObj[0].note = obj.note;
    this.dataService
      .updateDocument(obj.collId, updateObj[0])
      .then(() => {
        this.showSuccess('Post updated Successfully');
        this.myForm.markAsPristine();
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  addPost() {
    this.dataService.addData();
  }

  goToInstagramPost(url: string) {
    window.open(url, 'blank');
  }

  showInstagramPost(id: string, category:string) {
    this.instaID = id;
    this.instaUrl = this.sanitizeUrl();
    this.panelOpenState = true;
    this.selectedCategory = category;
  }

  goToEditPost(obj: any) {
    // this.router.navigate(['/edit-post'], {queryParams: { data: JSON.stringify(obj)}});
    this.editMode = true;
  }

  copyToClipboard(url: string) {
    this.clipboardService.copy(url);
    alert('Post URL Copied to Clipboard!');
  }

  deletePost(collId: string) {
    this.posts = this.posts.filter((item) => item.collectionId !== collId);
    this.dataService.deletePost(collId);
    this.showWarning('Post Deleted!');
    this.instaID = '';
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // let startIndex = this.pageSize * this.pageIndex;
    if (this.selectedCategory === '') {
      this.getMasterList(this.collectionHistory[this.pageIndex], this.pageSize);
    } else {
      this.getCategoryList(
        this.collectionHistory[this.pageIndex],
        this.pageSize,
        this.selectedCategory
      );
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  searchByKeyword(key: string) {
    this.posts = [];
    this.createForm();
    let lastItem = '';
    this.showFilter = false;
    this.selectedKeyword = key;
    this.selectedCategory = '';
    this.dataService.getDocumentsByKeyword(key).subscribe((item: any) => {
      item.forEach((post: any) => {
        this.posts.push(post);
        this.addItem(post);
        lastItem = post.collectionId;
      });
      this.collectionHistory.push(lastItem);
    });
  }

  searchKeywordData() {
    if (this.searchKeyword.trim() === '') {
      return this.keywords;
    } else {
      return this.keywords.filter((item: any) => {
        return item.includes(this.searchKeyword.toLowerCase());
      });
    }
  }
}
