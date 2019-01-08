import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';


import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';

import { HomePage } from '../home/home';
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
  	public http: HttpClient,
    public loadingCtrl: LoadingController, 
    private auth:AuthLoginProvider,
    public menuCtrl: MenuController,) {
    this.menuCtrl.enable(false,'mainMenu'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authLogin(){
    let loading = this.loadingCtrl.create();
    loading.present();

  	const httpOptions = {
  		headers: new HttpHeaders({
  		"Accept":"application/json",
  		"Content-Type":"application/json",
  		})
  	};

  	let path = "api/login";
  	return this.http.post(this.URL_SERVER+path, this.loginData, httpOptions).subscribe(res => {
      console.log(res);loading.dismiss();
      this.auth.setToken(res);
      window.location.reload();
      },err =>{
        console.log('Error', err); loading.dismiss()
      });
  }

  logIn(){
  	console.log(this.loginData);
  }

}
