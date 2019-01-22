import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

	//private URL_SERVER = "http://127.0.0.1:8000/"; 
  // public URL_SERVER = "http://10.0.2.2:8000/";
  private URL_SERVER
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public http: HttpClient,
    public loadingCtrl: LoadingController, 
    private auth:AuthLoginProvider,
    public menuCtrl: MenuController, public storage: Storage,
    public events: Events, private alertCtrl: AlertController) {
    this.menuCtrl.enable(false,'mainMenu'); 

    this.URL_SERVER = this.auth.URL_SERVER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  reloadData(){
    this.events.publish('user:data');
  }

  authLogin(){
    let alertError = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Los datos no son correctos',
      buttons: [{
        text: 'Aceptar',
        handler:()=>{
          this.navCtrl.push(LoginPage);
        },
      }],
    });

    let loading = this.loadingCtrl.create();
    loading.present();

  	const httpOptions = {
  		headers: new HttpHeaders({
  		"Accept":"application/json",
  		"Content-Type":"application/json",
  		})
  	};

  	let path = "api/login";
  	  this.http.post(this.URL_SERVER+path, this.loginData, httpOptions).subscribe(res => {
      console.log(res);
      this.auth.setToken(res);
      this.storage.get('token').then(value => {
        if(value){
          loading.dismiss();
          this.events.publish('user:data');
          //window.location.reload();
        }
      });

      //window.location.reload();
      this.navCtrl.push(HomePage);
      },err =>{
        console.log('Error', err); loading.dismiss(); alertError.present();
      });
  }

  logIn(){
  	console.log(this.loginData);
  }

}
