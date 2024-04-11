import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddPostComponent],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    FormsModule
  ]
})
export class AddPostModule { }
