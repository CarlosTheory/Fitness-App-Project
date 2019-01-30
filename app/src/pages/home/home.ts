import { Component } from '@angular/core';
import { NavController, MenuController, Events, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GoalsPage } from '../goals/goals';
//Provider
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


export interface Categories {
  id: number,
  name: string,
  description: string,
  created_at: string,
}

export interface Media {
  id: number,
  name: string,
  url: string,
}

export interface Posts {
  id: number,
  title: string,
  body: string,
  user_id: number,
  active: number,
  created_at: string,
  user: {
    [key:string]: User  
  },
  categories: {
    [key:string]: Categories
  },
  media:{
    [key: string]: Media
  }

}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  public posts: any;
  public URL_SERVER;
  public userDetails: Data;
  public userGoals;
  public userId:number;
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authCtrl: AuthLoginProvider,
    public http: HttpClient,
    public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController) {
    this.storage.get('token').then(value => {
      return this.getUserDetails(value);
    });
    this.menuCtrl.enable(true,"mainMenu");
    this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.getPosts();
    //this.confirmTokenExists("hola");

    events.subscribe('posts:reload', ()=>{
      this.getPosts();
    });
  }

  showMenu(){
  	this.menuCtrl.toggle('mainMenu');
  }

 /* confirmTokenExists(app){
    this.events.publish('app:component', app);      
  }*/

  getPosts(){
    let path = 'api/posts';
    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.posts = data;
      this.posts.forEach(function (value){
        //console.log(value);
        return value;
      });
    });
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

  checkGoals(){
    let alertGoals = this.alertCtrl.create({
      title:"¡Hola!",  
      message: "Hemos notado que aun no has establecido <strong>Metas</strong>, esto es importante para crear un <strong>feed</strong> personalizado para ti. Puedes hacerlo ahora o luego ;)",
      buttons: [
        {
          text: 'Más tarde...',
          role: 'cancel',
          handler: () => {
            console.log('Ha cancelado el alert para establecer metas')
          }
        },
        {
          text: 'Ok, quiero establecer metas',
          handler: () => {
            this.navCtrl.push(GoalsPage);
            console.log('go to metas');
          }
        }
      ],
    });

    console.log(this.userId);
    let path = "api/"+this.userId+"/goal";

    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.userGoals = data;
      this.userGoals.forEach(value => {
        //console.log(value);
        if(value === "No tiene metas registradas."){
          alertGoals.present();
        }
      });
    }, err => {
      console.log(err);
    });
  }
}
