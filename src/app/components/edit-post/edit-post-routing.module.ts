import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [{ path: 'edit-post', component: EditPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostRoutingModule {}
