import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
//import { MyApp } from '../../app/app.component';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public Details:Data;
  public URL_SERVER: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public auth: AuthLoginProvider, public http: HttpClient
    //public myApp: MyApp
  ){
    this.URL_SERVER = this.auth.URL_SERVER;
    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
      this.Details = res;
      //console.log(this.userDetails.user.name);
      return this.Details;
    });
  
  }

}
