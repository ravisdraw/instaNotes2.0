import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import { ClipboardModule } from 'ngx-clipboard';
import { ReactiveFormsModule } from '@angular/forms';

import {MatPaginatorModule} from '@angular/material/paginator';
import { ArrayToWordsPipe } from '../../pipes/array-to-words.pipe';
import { WordsToArrayPipe } from '../../pipes/words-to-array.pipe';


@NgModule({
    declarations: [HomePageComponent, ArrayToWordsPipe,WordsToArrayPipe],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    MatExpansionModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers : [
    ArrayToWordsPipe,
    WordsToArrayPipe
  ]
})
export class HomePageModule { }
