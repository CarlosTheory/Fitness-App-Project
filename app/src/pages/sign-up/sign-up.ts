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
  public dataSelected = {
  	"province" : "",
  };

  public cities: any;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
