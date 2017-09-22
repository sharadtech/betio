import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})

export class IntroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log("Class :: IntroPage :: constructor.");
  }

  slides = [
     {
       title: "Welcome to the My App!",
       description: "Start <b>Cheering</b> with your friends. Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text Some extra text .",
       image: "assets/intro-page/slide-1.jpg",
     },
     {
       title: "Sport Betting or Cheering",
       description: "Bet on <b>Any</b> Events.",
       image: "assets/intro-page/slide-2.jpg",
     }
   ];

  goToLoginPage(){
    console.log("Class :: IntroPage :: goToLoginPage().");
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log("Class :: IntroPage :: ionViewDidLoad().");
  }

  ionViewCanEnter(){
    console.log("Class :: IntroPage :: ionViewCanEnter().");
  }
}
