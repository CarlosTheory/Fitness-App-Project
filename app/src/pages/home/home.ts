import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Provider
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';

export interface User {
  id: number,
  name: string,
  last_name: string,
  email: string,
  country: string,
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
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authCtrl: AuthLoginProvider,
    public http: HttpClient) {
    this.menuCtrl.enable(true,"mainMenu");
    this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.getPosts();
  }

  showMenu(){
  	this.menuCtrl.toggle('mainMenu');
  }

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
}
