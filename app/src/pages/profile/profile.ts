import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
//import { MyApp } from '../../app/app.component';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface User{
  id:number,
  name:string,
  last_name:string,
  email: string,
  country: string,
  province: string,
  city: string,
  zip_code: number,
  address: string,
  birthday: string,
  gender: string,
  avatar: string,
  phone:string,
}

export interface Data{
  user:{
    [key:string]: User,
  };
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public Details:Data;
  public URL_SERVER: string;
  public userPhoto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public auth: AuthLoginProvider, public http: HttpClient, private camera: Camera,
    //public myApp: MyApp
    public menuCtrl: MenuController,
    private transfer: FileTransfer, 
    private file: File,
    private loadingCtrl: LoadingController,
  ){
    this.URL_SERVER = this.auth.URL_SERVER;
    this.storage.get('token').then((value:any)=>{
      return this.getUserDetails(value);
    });
    this.navCtrl.swipeBackEnabled = true;
    this.menuCtrl.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
      this.Details = res;
      //console.log(this.userDetails.user.name);
      return this.Details;
    });
  
  }

  photoWithCamera(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    console.log("hola");
    this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
     this.userPhoto = 'data:image/jpeg;base64,' + imageData;
     this.uploadImage();
     console.log(this.userPhoto);
      }, (err) => {
         console.log("Error: "+err);
      });
  }

   cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.userPhoto = 'data:image/jpeg' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadImage(){
    //Show loading
    let path = 'api/update/'+this.Details.user.id;
    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 10);

    //option transfer  
    let options: FileUploadOptions = {
      fileKey: 'avatar',
      fileName: "myImage_"+".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {
      headers: new HttpHeaders({
                "Authorization":"Bearer "+this.storage.get('token').then(value => {value}),
                "Accept":"application/json",
                "Content-Type":"application/json",
                })
      }
    }

    //file transfer action
    fileTransfer.upload(this.userPhoto, this.URL_SERVER+path, options)
      .then((data) => {
        console.log('Imagen subida: '+data);
        loader.dismiss();
        this.storage.get('token').then((value:any)=>{
          return this.getUserDetails(value);
        });
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }

}
