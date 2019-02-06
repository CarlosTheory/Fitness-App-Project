import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
/**
 * Generated class for the SearchCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface User{
	id:number,
	username: string,
	name:string,
	last_name: string,
}

export interface Category{
	id: number,
	name: string,
	description: string,
}

export interface Goal{
	id: number,
	name: string,
	description: string,
	active: boolean,
}


@IonicPage()
@Component({
  selector: 'page-search-categories',
  templateUrl: 'search-categories.html',
})
export class SearchCategoriesPage {
	public URL_SERVER;
	public userData: User[] = [];
	public search: string = "usuarios";
	public categoriesAll: Category[] = []
	public goalsAll: Goal[] = [];

	public inputSearch: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public authCtrl: AuthLoginProvider,
  	public http: HttpClient) {

  	this.URL_SERVER = this.authCtrl.URL_SERVER;
  }

  ionViewDidLoad() {
  	 this.getUsers();
    console.log('ionViewDidLoad SearchCategoriesPage');
  }

  getCategories(){
  	let path = 'api/categories';
  	let httpOptions = {
  		headers: new HttpHeaders({
  			'Content-type':'application/json',
  			'Accept':'application/json',
  		}),
  	};

  	this.http.get(this.URL_SERVER+path, httpOptions).subscribe((res: Category[]) => {
  		this.categoriesAll = res;
  		return this.categoriesAll;
  	});
  }

  getGoals(){
  	let path = 'api/goals';
  	let httpOptions = {
  		headers: new HttpHeaders({
  			'Content-type':'application/json',
  			'Accept':'application/json',
  		}),
  	};

  	this.http.get(this.URL_SERVER+path, httpOptions).subscribe((res: Goal[]) => {
  		this.goalsAll = res;
  		return this.goalsAll;
  	});
  }

  getUsers(){
  	let path = 'api/get/users';

  	let httpOptions = {
  		headers: new HttpHeaders({
  			'Content-Type':'application/json',
  			'Accept': 'application/json',
  		}),
  	}

  	this.http.get(this.URL_SERVER+path, httpOptions).subscribe((data: User[]) => {
  		this.userData = data;
  		return this.userData;
  	});
  }

  getSearchInput(ev){	
  	let input = ev.target.value;

  	if(input == ''){
  		this.getUsers();
  	}

  	if(input && input.trim() != '' ){
  		this.userData = this.userData.filter((res) => {
  			console.log(res.name.toLowerCase().indexOf(input.toLowerCase()) > -1);
  			return (res.name.toLowerCase().indexOf(input.toLowerCase()) > -1);
  		}, err => {
  			console.log(JSON.stringify(err));
  		});
  	}

  }

}
