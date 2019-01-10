import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';

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
  	"country" : "Venezuela",
  	"province" : "",
  	"city" : "",
  	"zip_code" : "",
  	"phone" : "",
  	"address" : "",
  	"birthday" : "",
  	"gender" : "",
  };

  private URL_SERVER = "http://127.0.0.1:8000/"; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: GeoProvider, public http:HttpClient,
    public loadingCtrl:LoadingController,
    private alertCtrl: AlertController,
    public menuCtrl:MenuController) {
  	this.showProvincesVe();
    this.menuCtrl.enable(false, 'mainMenu');
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

    let loading = this.loadingCtrl.create();
    loading.present();
    const httpOptions = {
     headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
    })
  };
    const pathSign = "api/register";

    this.dataSelected.city = this.dataSelected.city.replace(/\n/ig, '');
    this.dataSelected.province = this.dataSelected.province.replace(/\n/ig, '');
    console.log(this.dataSelected);
    console.log(this.dataSelected.city);
    console.log(this.dataSelected.province);

  	return this.http.post(this.URL_SERVER+pathSign, this.dataSelected, httpOptions)
      .subscribe(res => {console.log(res); loading.dismiss(); alertSuccess.present()}, err => {console.log("Error :" + err); loading.dismiss()});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
