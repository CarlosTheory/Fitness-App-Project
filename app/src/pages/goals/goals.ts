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
	public goalId;

	public userGoals;
	public allGoals;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public auth: AuthLoginProvider, public alertCtrl: AlertController,
  	public storage: Storage) {
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
  	console.log(this.userId);
  	console.log(this.goalId);
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

  	this.http.post(this.URL_SERVER+path, request, httpOptions).subscribe(res => {
  		console.log(res);
  		this.getAllGoals();
  		this.checkGoals();
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
