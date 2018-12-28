import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


import { SignUpPage } from '../sign-up/sign-up';
import { LoginPage } from '../login/login';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  @ViewChild(Slides) slides: Slides;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

   goToSlide() {
    this.slides.slideTo(2, 500);
  }

  goToSignUp(){
    this.navCtrl.push(SignUpPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}
