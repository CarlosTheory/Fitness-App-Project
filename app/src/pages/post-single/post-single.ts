import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { HomePage } from '../home/home'; 

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

export interface User{
  username:string,
  avatar:string,
}

@IonicPage()
@Component({
  selector: 'page-post-single',
  templateUrl: 'post-single.html',
})
export class PostSinglePage {
  public postId = 0;
  public URL_SERVER;
  public numberOfComments:any = "No hay ";
  public postData: Post;

  public numberOfCommentsString:string = "Comentario";
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public authCtrl: AuthLoginProvider,
  	public http: HttpClient) {
  	console.log('Post Single Page');

  	this.URL_SERVER = this.authCtrl.URL_SERVER;
    this.postId = this.navParams.get('id');
    console.log(this.postId);
    this.getPost();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostSinglePage');
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
      for(let i in this.postData.comments){
        this.numberOfComments = (i.length+1);
        console.log("Numero de comentarios:"+this.numberOfComments);

        if(this.numberOfComments > 1){
          this.numberOfCommentsString = "Comentarios";
        } else if(this.numberOfComments === 0){
          this.numberOfCommentsString = "No hay comentarios";
        }

      }

  	});
  }

}
