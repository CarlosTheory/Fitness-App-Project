import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { OrderModule } from 'ngx-order-pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { ProfilePage } from '../pages/profile/profile';
import { PostPage } from '../pages/post/post';
import { GoalsPage } from '../pages/goals/goals';
import { AddGoalPostPage } from '../pages/add-goal-post/add-goal-post';
import { PostSinglePage } from '../pages/post-single/post-single';
import { SearchCategoriesPage } from '../pages/search-categories/search-categories';
import { CategoryPostPage } from '../pages/category-post/category-post';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeoProvider } from '../providers/geo/geo';

import { HttpClientModule } from '@angular/common/http';
import { AuthLoginProvider } from '../providers/auth-login/auth-login';

import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    WelcomePage,
    SignUpPage,
    UserDetailsPage,
    ProfilePage,
    PostPage,
    GoalsPage,
    AddGoalPostPage,
    PostSinglePage,
    SearchCategoriesPage,
    CategoryPostPage,
    AboutPage
    
  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TruncateModule,
    OrderModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    WelcomePage,
    SignUpPage,
    UserDetailsPage,
    ProfilePage,
    PostPage,
    GoalsPage,
    AddGoalPostPage,
    PostSinglePage,
    SearchCategoriesPage,
    CategoryPostPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoProvider,
    AuthLoginProvider,
    File,
    FileTransfer,
    InAppBrowser
  ]
})
export class AppModule {}
