import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';


import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { GeoProvider } from '../../providers/geo/geo';

import { LoginPage } from '../login/login';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public provinces: any;
  public cities:any;
  public dataSelected = {
  	"name" : "",
  	"last_name" : "",
  	"email" : "",
  	"password" : "",
    "password_validate": "",
  	"country" : "Venezuela",
  	"province" : "",
  	"city" : "",
  	"zip_code" : "",
  	"phone" : "",
  	"address" : "",
  	"birthday" : "",
  	"gender" : "",
  };

  //private URL_SERVER = "http://127.0.0.1:8000/"; 
  // public URL_SERVER = "http://10.0.2.2:8000/";

  public URL_SERVER;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: GeoProvider, public http:HttpClient,
    public loadingCtrl:LoadingController,
    private alertCtrl: AlertController,
    public menuCtrl:MenuController,
    public auth:AuthLoginProvider) {
  	this.showProvincesVe();
    this.menuCtrl.enable(false, 'mainMenu');

    this.URL_SERVER = this.auth.URL_SERVER;
  }

  showProvincesVe(){
  	this.geo.getDataVenezuela().subscribe(data => {
  		console.log("Estados cargados.")
  		return this.provinces = data;
  	});
  }	

  passProvince(index){
  	console.log(index);
  	this.geo.getDataVenezuela().subscribe(data => {
  		return this.cities = data[index].ciudades;
  	});
  }



   firstLetterCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sendData(){

    let alertSuccess = this.alertCtrl.create({
      title: '¡Registro exitoso!',
      subTitle: 'Ahora puede ingresar a la aplicacion',
      buttons: [{
        text: 'Aceptar',
        handler:()=>{
          this.navCtrl.push(LoginPage);
        },
      }],
    });

    let alertError = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      subTitle: 'Puedes intentar de nuevo, recuerda que los campos con (*) son requeridos obligatoriamente',
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
        handler:()=>{
          console.log("paso un error");
        },
      }],
    });

    let alertPassword = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      subTitle: 'El campo contraseña y validar contraseña, deben ser iguales',
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
        handler:()=>{
          console.log("las claves no concuerdan");
        },
      }],
    });

    let loading = this.loadingCtrl.create();
    loading.present();
    const httpOptions = {
     headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json',
    })
  };
    const pathSign = "api/register";

    this.dataSelected.name = this.firstLetterCase(this.dataSelected.name);
    this.dataSelected.last_name = this.firstLetterCase(this.dataSelected.last_name);
    this.dataSelected.address = this.firstLetterCase(this.dataSelected.address);
    this.dataSelected.city = this.dataSelected.city.replace(/\n/ig, '');
    this.dataSelected.province = this.dataSelected.province.replace(/\n/ig, '');

    if(this.dataSelected.password === this.dataSelected.password_validate){
      return this.http.post(this.URL_SERVER+pathSign, this.dataSelected, httpOptions)
      .subscribe(res => {console.log(res); loading.dismiss(); alertSuccess.present()}, err => {console.log("Error :" + JSON.stringify(err)); alertError.present(); loading.dismiss()});
    } else {
      alertPassword.present();
      loading.dismiss();
    }

  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
