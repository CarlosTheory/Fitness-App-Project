import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AddGoalPostPage } from '../add-goal-post/add-goal-post';


import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import { AuthLoginProvider } from '../../providers/auth-login/auth-login';


/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export interface User {
 	id:number,
 }

 export interface Data {
 	user: User,
 }

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
	public URL_SERVER: string;
	public categories: any;
	public categoryId: number;
	public mediaPost: string;
	public Details:Data;

		public postDataSelected = {
		"title":"",
		"body":"",
		"user_id":"",
		"media":"",
	};

	public categorySelected = {
		"id":"",
		"name":"",
	};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthLoginProvider, public http: HttpClient,
  	public storage: Storage, private camera: Camera, private transfer: FileTransfer, 
    private file: File, private loadingCtrl: LoadingController, public events: Events) {

  	this.storage.get('token').then(value => {
  		return this.getUserDetails(value);
  	});
  	this.URL_SERVER = this.auth.URL_SERVER;
  	this.getCategories();
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

    this.http.post(this.URL_SERVER+path,"",httpOptions).subscribe((res: Data) => {
      this.Details = res;
      //console.log(this.Details.user.id);
      return this.Details;
    });
  
  }

  getCategories(){
  	let path = "api/categories"

  	let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
      })
    };

    this.http.get(this.URL_SERVER+path).subscribe(value => {
    	this.categories = value;
    	this.categories.forEach(value => {
    		console.log(value);
    	});
    });

  }

  firstLetterCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.mediaPost = 'data:image/jpeg;base64,' + imageData;
      //console.log(this.mediaPost);
      
      // this.storage.get('token').then((value:any)=>{
      //   return this.getUserDetails(value);
      // });
    }, (err) => {
      // Handle error
    });
  }


    uploadPost(){
    //Show loading
    let path = 'api/post/'+this.Details.user.id+'/create/'+this.categoryId;
    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    //var random = Math.floor(Math.random() * 10);

    //option transfer  

    this.postDataSelected.title = this.firstLetterCase(this.postDataSelected.title);
    this.postDataSelected.body = this.firstLetterCase(this.postDataSelected.body);
    let options: FileUploadOptions = {
      fileKey: 'media',
      fileName: "myImage_"+".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "multipart/form-data", // add mimeType
      params: {
      	title: this.postDataSelected.title,
      	body: this.postDataSelected.body,
      	user_id: this.Details.user.id,
      },
      headers: {
      headers: new HttpHeaders({
                "Accept":"application/json",
                "Content-Type":"application/json",
                })
      }
    }

    //file transfer action
    fileTransfer.upload(this.mediaPost, this.URL_SERVER+path, options)
      .then((data) => { 
      	console.log("ID Usuario:"+this.Details.user.id+"<br>"+"ID Categoria:"+this.categoryId)
        console.log('Post Creado: ' + data.response);
        loader.dismiss();
        this.events.publish('posts:reload');
        this.navCtrl.push(AddGoalPostPage);
        // this.storage.get('token').then((value:any)=>{
        //   return this.getUserDetails(value);
        // });
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }


  passCategoryId(id){
  	console.log(id);
  	return this.categoryId = id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

}
