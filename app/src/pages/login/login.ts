import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public loginData = {
		"email":"",
		"password":"",
	}

	private URL_SERVER = "http://127.0.0.1:8000/"; 


  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authLogin(){
  	const httpOptions = {
  		headers: new HttpHeaders({
  		"Accept":"application/json",
  		"Content-Type":"application/json",
  		})
  	};

  	let path = "api/login";
  	return this.http.post(this.URL_SERVER+path, this.loginData, httpOptions).subscribe(res => {console.log(res)});
  }

  logIn(){
  	console.log(this.loginData);
  }

}
