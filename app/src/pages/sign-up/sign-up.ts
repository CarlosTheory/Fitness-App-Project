import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeoProvider } from '../../providers/geo/geo';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: GeoProvider) {
  	this.showProvincesVe();
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
  	this.dataSelected.city = this.dataSelected.city.replace(/\n/ig, '');
  	this.dataSelected.province = this.dataSelected.province.replace(/\n/ig, '');
  	console.log(this.dataSelected);
  	console.log(this.dataSelected.city);
  	console.log(this.dataSelected.province);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
