import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginPage } from '../../pages/login/login';
import { WelcomePage } from '../../pages/welcome/welcome';
import { MyApp } from '../../app/app.component';

import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface User{
  id:number,
  name:string,
  last_name:string,
}

export interface Data{
  user: {
    [key:string]: User
  };
}

@Injectable()
export class AuthLoginProvider {
  public URL_SERVER = "http://127.0.0.1:8000/";
  // public URL_SERVER = "http://10.0.2.2:8000/";
  public userDetails:Data; 

  constructor(public http: HttpClient, private storage:Storage) {
    console.log('Hello AuthLoginProvider Provider');
    this.storage.ready();
  }

  setToken(tokenObj){
    this.storage.set('token', tokenObj.success.token);
  }

  removeToken(){
    this.storage.remove('token');
    window.location.reload();
  }

}
