import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
/**
 * Generated class for the AddGoalPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 export interface User {
 	id: number;
 	name: string;
 }

 export interface Data{
 	user: User,
 }

 export interface Post{
 	id:number,
 	title:string,
 	body: string,
 	user_id: number,
 	active: number,
 }

@IonicPage()
@Component({
  selector: 'page-add-goal-post',
  templateUrl: 'add-goal-post.html',
})
export class AddGoalPostPage {
  public URL_SERVER;
  public userId;
  public userPosts;
  public postId;
  public allGoals;
  public goalID;

  public postData;
  public postGoals;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
  	public authCtrl: AuthLoginProvider, public storage: Storage, public events: Events) {

  	this.storage.get('token').then(token => {
  		return this.getUserDetails(token);
  	});

  	this.URL_SERVER = this.authCtrl.URL_SERVER;
  	this.getAllGoals();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGoalPostPage');
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
      console.log("ID de Usuario:"+this.userId);
      this.getUserPosts(this.userId);
    });
  
  }

  getUserPosts(userId){
  	let path = "api/user/posts";
  	let httpOptions = {
  		headers: new HttpHeaders({
  			"Content-Type": "application/json",
       		"Accept": "application/json",
  		}),
  	};

  	let body = {
  		"user_id": userId,
  	};

  	this.http.post(this.URL_SERVER+path, body, httpOptions).subscribe(res => {
  		this.userPosts = res;
  		// Sacar el ultimo elemento del forEach
  		this.userPosts.forEach((value, index, array) => {
  			if(index === (array.length -1)){
  				this.postData = value;
  				this.getPostId(value.id);
  				this.checkGoals();
  			}

  			// this.postId = value;
  			// console.log(this.postId);
  			// return this.getPostId(this.postId);
  		});
  	});
  }

  getPostId(postId){
  	this.postId = postId
  	console.log("Ultimo Post ID:"+this.postId);
  	return this.postId;
  }

  passGoalId(goalId){
  	this.goalID = goalId
  	console.log("GoalID es:"+this.goalID);
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

  addGoal(){
  	 console.log(this.postId);
  	console.log(this.goalID);
  	let path = "api/add/postgoal";
  	let httpOptions = {
  		headers:new HttpHeaders({
  			"Content-Type":"application/json",
  			"Accept":"application/json",
  		}),
  	};

  	let request = {
  		"post_id": this.postId,
  		"goal_id": this.goalID,
  	};

  	this.http.post(this.URL_SERVER+path, request, httpOptions).subscribe(res => {
  		console.log(res);
  		this.getAllGoals();
  		this.checkGoals();
  	});
  }

   checkGoals(){

    //console.log(this.userId);
    let path = "api/"+this.postId+"/goalpost";

    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.postGoals = data;
      this.postGoals.forEach(value => {
        console.log(value.name);
      });

      return this.postGoals;
    }, err => {
      console.log(err);
    });
  }

  goToHomePage(){
    this.events.publish('posts:reload');
  	this.navCtrl.push(HomePage);
  }

}
