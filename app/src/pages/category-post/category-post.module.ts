import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPostPage } from './category-post';

@NgModule({
  declarations: [
    CategoryPostPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPostPage),
  ],
})
export class CategoryPostPageModule {}
