import { Component } from '@angular/core';
import { NavController, MenuController, Events, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { OrderModule } from 'ngx-order-pipe';

import { GoalsPage } from '../goals/goals';
import { PostSinglePage } from '../post-single/post-single';
import { SearchCategoriesPage } from '../search-categories/search-categories';
//Provider
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';

export interface User {
  id: number,
  name: string,
  last_name: string,
  email: string,
  country: string,
  username:string,
  goals: UserGoals,
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
  },
  goals:[
    {[key: string]: UserGoals}
  ],

  comments: Comments,


}

export interface Comments{
  ['comments']:Comment;
}

export interface Comment{
  body:string,
  user: User,
}

export interface UserGoals{
  id:number,
  name:string,
  description: string,
  active:number,
  pivot: Goals,
}

export interface Goals {
  user_id:number,
  goal_id:number,

}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  public posts;
  // public posts: Posts;
  public URL_SERVER;
  public userDetails: Data;
  public userGoals;
  public userId:number;
  public homePosts:string = "Posts";

  public goalsFeed;
  public goalsFeedUser = [];
  public numberOfComments:any = "No hay ";
  public numberOfCommentsString:string = "Comentario";

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authCtrl: AuthLoginProvider,
    public http: HttpClient,
    public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
   
    this.storage.get('token').then(value => {
      return this.getUserDetails(value);
    });

    this.menuCtrl.enable(true,"mainMenu");
    this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.getAllPosts();
    //this.confirmTokenExists("hola");

    events.subscribe('posts:reload', ()=>{
      this.getAllPosts();
    });


    events.subscribe('postbyGoals:data', () => {
    this.checkGoals();
    });
  }

  showMenu(){
  	this.menuCtrl.toggle('mainMenu');
  }

 /* confirmTokenExists(app){
    this.events.publish('app:component', app);      
  }*/

  getAllPosts(){
    let path = 'api/posts';
    this.http.get(this.URL_SERVER+path).subscribe(data  => {
      this.posts = data;

       // console.log(this.posts.comments);
        
        // for(let i in this.posts.comments){
        //   console.log(this.posts.comments);
        //   this.numberOfComments = (i.length+1);
        //   console.log("Numero de comentarios:"+this.numberOfComments);

        //   if(this.numberOfComments > 1){
        //     this.numberOfCommentsString = "Comentarios";
        //   } else if(this.numberOfComments === 0){
        //     this.numberOfCommentsString = "No hay comentarios";
        //   }

        // }

      this.posts.forEach(res => {
        res.goals.forEach(data => {
          //console.log(data);
          //this.goalsFeed = data;
        });

        // res.comments.forEach(res => {
        //   // console.log(res);

        // });

      });

      // return this.posts;
      // this.posts.forEach(function (value){
      //   //console.log(value);
      //   return value;
      // });
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
      this.userDetails = res;
      this.userId = res.user.id;
      // console.log(JSON.stringify(this.userDetails));
      //console.log(this.userDetails);
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

    //console.log(this.userId);
    let path = "api/"+this.userId+"/goal";

    this.http.get(this.URL_SERVER+path).subscribe(data => {
      this.userGoals = data;
      //console.log(this.userGoals);
      this.userGoals.forEach(value => {
        //console.log(value);

        if(value === "No tiene metas registradas."){
          alertGoals.present();
        } else {
          this.homePosts = 'Metas';
          value.posts.forEach(posts => {
              //console.log(posts.title);
            posts.goals.forEach(goal => {
              // console.log(goal)
            });

          });

        }

      });

    }, err => {
      console.log(err);
    });
  }

  getAllPostsAndCompareGoals(){
    //console.log(this.goalsFeed);
  }

  viewSinglePost(id){
    this.navCtrl.push(PostSinglePage, {id:id});
  }

  goToSearchCategories(){
    this.navCtrl.push(SearchCategoriesPage);
  }

  // getUserCustomFeedWithGoals(){
  //   let path = 'api/'+this.userId+'/goal';

  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type' : 'application/json',
  //       'Accept':'application/json',
  //     }),
  //   };

  //   this.http.get(this.URL_SERVER+path, httpOptions).subscribe(data => {
  //     console.log(data);
  //   });
  // }

  reloadPosts(){
    let load = this.loadingCtrl.create();

    load.present();
    this.getAllPosts();
    load.dismiss();
  }

}
