import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginPage } from '../../pages/login/login';
import { WelcomePage } from '../../pages/welcome/welcome';
//import { MyApp } from '../../app/app.component';

import { Storage } from '@ionic/storage';
import { Events } from "ionic-angular";
/*
  Generated class for the AuthLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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

@Injectable()
export class AuthLoginProvider {
  //public URL_SERVER = "http://127.0.0.1:8000/";
  public URL_SERVER = "http://10.0.2.2:8000/";
  public userDetails:Data; 
  constructor(public http: HttpClient, private storage:Storage) {
    console.log('Hello AuthLoginProvider Provider');
    //this.storage.ready();
  }

  setToken(tokenObj){
    this.storage.set('token', tokenObj.success.token);
  }

  getUserDetails(){
    return this.storage.get('token');
  }



  removeToken(){
    this.storage.remove('token');
    this.storage.get('token').then(value =>{
      if(!value){
        window.location.reload()
      }
    });
  }

}
