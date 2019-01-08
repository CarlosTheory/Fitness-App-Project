import { Component, ViewChild,  Pipe, PipeTransform } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { UserDetailsPage } from '../pages/user-details/user-details';

import { AuthLoginProvider } from '../providers/auth-login/auth-login';

import { Storage } from '@ionic/storage';


export interface User{
  id:number,
  name:string,
  last_name:string,
}

export interface Data{
  user:{
    [key:string]: User,
  };
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  token: string;
  pages: Array<{title: string, component: any}>;
  private URL_SERVER = "http://127.0.0.1:8000/";

  public userDetails:Data;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public authCtrl:AuthLoginProvider, public storage: Storage, public http: HttpClient) {
    this.initializeApp();
    this.checkToken();

    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });

    // used for an example of ngFor and navigation  
/*    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Sign Up', component: SignUpPage },
    ];*/

    this.pages = [
      { title: 'Home', component: ()=>{this.nav.push(HomePage)} },
      { title: 'Mis Datos', component: ()=>{this.nav.push(UserDetailsPage)} },
      { title: 'Cerrar Sesión', component: ()=>{this.authCtrl.removeToken();this.nav.push(WelcomePage);} },
    ];
  }

  checkToken(){
    this.storage.get('token').then((value:any) => {
      if (!value) {
        this.rootPage = WelcomePage;
      }
    });
  }
  

  getUserDetails(token){
    let auth = "Bearer "+token;
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": auth,
        "Accept": "application/json",
      })
    };
    let path = "api/details";

    this.http.post(this.URL_SERVER+path,"",httpOptions).subscribe((res:Data) => {
      this.userDetails = res;
      console.log(this.userDetails.user.name);
      return this.userDetails;
    });
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /*openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }*/

}
