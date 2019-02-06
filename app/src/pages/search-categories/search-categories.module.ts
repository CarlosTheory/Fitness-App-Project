import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCategoriesPage } from './search-categories';

@NgModule({
  declarations: [
    SearchCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCategoriesPage),
  ],
})
export class SearchCategoriesPageModule {}
