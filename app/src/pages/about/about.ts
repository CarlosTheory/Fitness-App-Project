import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';




/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
  	public iab: InAppBrowser) {
  	this.menuCtrl.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
