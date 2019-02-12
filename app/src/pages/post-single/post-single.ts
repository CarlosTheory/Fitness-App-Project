import { Component, ViewChild, ElementRef } from '@angular/core';

import { IonicPage, NavController, NavParams, Events, AlertController, Scroll } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { HomePage } from '../home/home'; 

import { Storage } from '@ionic/storage';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
/**
 * Generated class for the PostSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Category{
  ['categories'];
} 

export interface Post {
  id:number,
  title:string,
  body:string,
  categories: Category,
  comments:Comments,
  created_at: string,
}

export interface Comments{
  ['comments']:Comment;
}

export interface Comment{
  body:string,
  user: User,
}

export interface UserDetails {
  user: User,
}

export interface User{
  id:number;
  username:string,
  avatar:string,
}

@IonicPage()
@Component({
  selector: 'page-post-single',
  templateUrl: 'post-single.html',
})
export class PostSinglePage {
  public postId;
  public userId;
  public URL_SERVER;
  public numberOfComments:any = "No hay ";
  public postData: Post;

  public userComment:string = "";

  public numberOfCommentsString:string = "Comentarios";
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public authCtrl: AuthLoginProvider,
  	public http: HttpClient, private storage: Storage, public alertCtrl: AlertController) {
  	console.log('Post Single Page');

    this.storage.get('token').then(data => {
      //console.log(data);
      this.getUserId(data);
    });

  	this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.postId = this.navParams.get('id');
    //console.log(this.postId);
    this.getPost();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostSinglePage');
  }

  getUserId(token){
    let path = "api/details";
    let auth = "Bearer "+token
    let headers = {
      headers: new HttpHeaders({
        "Authorization": auth,
        "Content-type":"application/json",
        "Accept":"application/json",
      }),
    };

    this.http.post(this.URL_SERVER+path,"", headers).subscribe((res: UserDetails) => {
      this.userId = res.user.id;
    });
  }

  getPost(){
  	let path = 'api/post/'+this.postId;

  	let httpOptiones = {
  		headers: new HttpHeaders({
  			'Content-Type':'application/json',
  			'Accept':'application/json',
  		}),
  	};

  	this.http.get(this.URL_SERVER+path, httpOptiones).subscribe((res: Post) => {
  		this.postData = res;
      // console.log((<any>this.postData.comments).length);
      this.numberOfComments = (<any>this.postData.comments).length

  	});
  }

  @ViewChild("content") comentario: any;

  scrollToComment():void{
    if(this.comentario._scroll){
      this.userComment = "";

      this.getPost();
      this.events.publish("posts:reload");
      this.comentario.scrollToBottom(0);} 
  }

  addComment(){
    let path = "api/add/comment";
    let headers = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        "Accept":"application/json",
      }),
    };

    let body = {
      "body":this.userComment,
      "user_id":this.userId,
      "post_id":this.postId,
    };

    let alertNoComment = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Tienes que escribir algo en la caja de comentario para poder enviarlo.',
      buttons:['Ok, esta bien']
    });

    if(this.userComment.length > 0){

      this.http.post(this.URL_SERVER+path, body, headers).subscribe(data => {
        console.log("Comentario agregado");
      }, err => {
        console.log(JSON.stringify(err));
      });

      this.scrollToComment();

    }else{
      alertNoComment.present();
    }



  }

}
