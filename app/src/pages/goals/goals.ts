import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';


export interface User {
  id: number,
  name: string,
  last_name: string,
  email: string,
  country: string,
}

export interface Data{
  user: User,
}


@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage {
	public URL_SERVER
	public userId;

	public selectGoal;
	public userGoals;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public auth: AuthLoginProvider, public alertCtrl: AlertController,
  	public storage: Storage) {
  	this.URL_SERVER = this.auth.URL_SERVER

  	this.storage.get('token').then(value => {
  		return this.getUserDetails(value);
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalsPage');
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
      this.userId = res.user.id;
      //console.log(this.userDetails.user.name);
      this.checkGoals();
    });
  
  }

  addGoal(){
  	console.log(this.userId);
  	let path = "api/add/goal";
  	let httpOptions = {
  		headers:new HttpHeaders({
  			"Content-Type":"application/json",
  			"Accept":"application/json",
  		}),
  	};

  	let request = {
  		"name": this.selectGoal,
  		"user_id": this.userId,
  	};

  	this.http.post(this.URL_SERVER+path, request, httpOptions).subscribe(res => {
  		console.log(res);
  		this.checkGoals();
  	});
  }

  checkGoals(){

    //console.log(this.userId);
    let path = "api/"+this.userId+"/goal";

    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.userGoals = data;
      this.userGoals.forEach(value => {
        console.log(value.name);
      });

      return this.userGoals;
    }, err => {
      console.log(err);
    });
  }

}
