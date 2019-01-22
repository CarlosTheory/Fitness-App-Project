import { Component, ViewChild,  Pipe, PipeTransform } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { PostPage} from '../pages/post/post';
import { ProfilePage } from '../pages/profile/profile';

import { AuthLoginProvider } from '../providers/auth-login/auth-login';

import { Storage } from '@ionic/storage';


export interface User{
  id:number,
  name:string,
  last_name:string,
  email: string,
  country: string,
  province: string,
  city: string,
  zip_code: number,
  address: string,
  birthday: string,
  gender: string,
  avatar: string,
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
  profile: Array<{title: string, component: any}>;
  
  public URL_SERVER;
  //private URL_SERVER = "http://127.0.0.1:8000/";
  // public URL_SERVER = "http://10.0.2.2:8000/";

  public userDetails:Data;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public authCtrl:AuthLoginProvider, public storage: Storage, public http: HttpClient, public events: Events,
    public loadingCtrl: LoadingController) {
    this.initializeApp();
    this.checkToken();
    this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });

    events.subscribe('user:data', () => {
    this.reloadToken();
    });

    // used for an example of ngFor and navigation  
/*    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Sign Up', component: SignUpPage },
    ];*/

    this.pages = [
      { title: 'Home', component: ()=>{this.nav.push(HomePage)} },
      { title:'Crear Post', component: ()=>{this.nav.push(PostPage)} },
      { title: 'Mis Datos', component: ()=>{this.nav.push(UserDetailsPage)} },
      { title: 'Cerrar Sesión', component: ()=>{let loading = this.loadingCtrl.create();
                                                loading.present()
                                                this.authCtrl.removeToken();this.checkToken();loading.dismiss();} 
                                               },
    ];

    this.profile = [
      { title: 'Perfil', component: ()=>{this.nav.push (ProfilePage)} },
    ];

    this.profile.forEach(value => {
      console.log(value);
    });
  }

  reloadToken(){
    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });
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
      //console.log(this.userDetails.user.name);
      return this.userDetails;
    });
  
  }

  goToProfile(){
    this.nav.push(ProfilePage);
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
