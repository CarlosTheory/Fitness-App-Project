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
  ['categories'],
} 

export interface Post {
  id:number,
  title:string,
  body:string,
  categories: Category,
  created_at: string,
}

@IonicPage()
@Component({
  selector: 'page-post-single',
  templateUrl: 'post-single.html',
})
export class PostSinglePage {
  public postId = 0;
  public URL_SERVER;

  public postData: Post;
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
  		console.log(this.postData);
  		return this.postData;
  	});
  }

}
