import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      url: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      keywords: [''],
      notes: ['']
    });
  }
}
