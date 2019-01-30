import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGoalPostPage } from './add-goal-post';

@NgModule({
  declarations: [
    AddGoalPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGoalPostPage),
  ],
})
export class AddGoalPostPageModule {}
