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
  private URL_SERVER = "http://127.0.0.1:8000/";
  public userDetails:Data; 

  constructor(public http: HttpClient, private storage:Storage) {
    console.log('Hello AuthLoginProvider Provider');
    this.storage.ready();
    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });
  }

  setToken(tokenObj){
    this.storage.set('token', tokenObj.success.token);
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

    return this.http.post(this.URL_SERVER+path,"",httpOptions).subscribe((res:Data) => {
      this.userDetails = res;
      console.log(this.userDetails);
    });
  }

  removeToken(){
    this.storage.remove('token');
    window.location.reload();
  }

}
