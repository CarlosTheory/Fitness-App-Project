import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { PostSinglePage } from '../post-single/post-single';

/**
 * Generated class for the CategoryPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-post',
  templateUrl: 'category-post.html',
})
export class CategoryPostPage {

public categoryId:number;
public URL_SERVER:string;
public posts:any;

public noData: string = "No hay entradas en esta categoria.";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
  	public authCtrl:AuthLoginProvider) {
  	this.categoryId = this.navParams.get('category_id');
  	this.URL_SERVER = this.authCtrl.URL_SERVER;

  	this.getPostsByCategory();
  }

  getPostsByCategory(){
  	let path="api/category/"+this.categoryId;
  	let headers = {
  		headers: new HttpHeaders({
  			"Content-Type":"application/json",
  			"Accept":"application/json",
  		}),
  	};

  	this.http.get(this.URL_SERVER+path, headers).subscribe(res => {
  		this.posts = res;


  		this.posts.posts.forEach(data => {
  			console.log(data);

  			if(this.posts.posts){
  				this.noData = "";
  			}

  		});

  	});


  }

  viewSinglePost(id){
    this.navCtrl.push(PostSinglePage, {id:id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPostPage');
  }

}
