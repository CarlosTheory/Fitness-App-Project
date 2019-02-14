import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, LoadingController  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OrderModule } from 'ngx-order-pipe';

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
	public goalId;

	public userGoals;
	public allGoals;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public auth: AuthLoginProvider, public alertCtrl: AlertController,
  	public storage: Storage, public events: Events, public loadingCtrl: LoadingController) {
  	this.URL_SERVER = this.auth.URL_SERVER

  	this.storage.get('token').then(value => {
  		return this.getUserDetails(value);
  	});
  	this.getAllGoals();
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

  passGoalId(goalId){
  	return this.goalId = goalId;
  }

  addGoal(){
    let loading = this.loadingCtrl.create();

  	//console.log(this.userId);
  	//console.log(this.goalId);
  	let path = "api/add/usergoal";
  	let httpOptions = {
  		headers:new HttpHeaders({
  			"Content-Type":"application/json",
  			"Accept":"application/json",
  		}),
  	};

  	let request = {
  		"user_id": this.userId,
  		"goal_id": this.goalId,
  	};

    loading.present();
  	this.http.post(this.URL_SERVER+path, request, httpOptions).subscribe(res => {
  		console.log(res);
  		this.getAllGoals();
  		this.checkGoals();
      this.events.publish('postbyGoals:data');
      loading.dismiss();
  	});
  }

  getAllGoals(){
  	let path = "api/goals";
  	let httpOptions = {
  		headers: new HttpHeaders({
  			"Content-Type": "application/json",
  			"Accept":"application/json",
  		}),
  	};

  	this.http.get(this.URL_SERVER+path, httpOptions).subscribe(res => {
  		this.allGoals = res;
  		this.allGoals.forEach(value => {
  			return this.allGoals;
  		});
  	});

  }

  checkGoals(){
    let load = this.loadingCtrl.create();

    console.log('Chequeando si el usuario tiene metas...');
    //console.log(this.userId);
    let path = "api/"+this.userId+"/goal";

    load.present();
    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.userGoals = data;
      this.userGoals.forEach(value => {
        console.log(value.name);
      });
      load.dismiss();
      return this.userGoals;
    }, err => {
      console.log(err);
    });
  }

  removeGoal(goal_id){
    //console.log("goal:"+goal_id+"<br>"+"user:"+this.userId);

    let loading = this.loadingCtrl.create();
    let path="api/remove/userGoal";
    let headers={
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        "Accept":"application/json",
      }),
    };

    let request = {
      "goal_id":goal_id,
      "user_id":this.userId,
    };

    loading.present();
    this.http.post(this.URL_SERVER+path, request, headers).subscribe(res => {
      console.log(res);


      this.getAllGoals();
      this.checkGoals();
      this.events.publish('postbyGoals:data');
      loading.dismiss();
    });

  }

}
