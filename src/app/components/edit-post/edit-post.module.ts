import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPostRoutingModule } from './edit-post-routing.module';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [EditPostComponent],
  imports: [CommonModule, EditPostRoutingModule],
})
export class EditPostModule {}
