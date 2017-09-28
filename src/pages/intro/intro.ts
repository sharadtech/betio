import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})

export class IntroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nativeStorage: NativeStorage
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

  ionViewCanEnter(){
    console.log("Class :: IntroPage :: ionViewCanEnter().");
  }

  ionViewDidLoad() {
    console.log("Class :: IntroPage :: ionViewDidLoad().");
    let env = this;
		this.nativeStorage.getItem('userData')
		  .then(function (data){
        console.log("Class :: IntroPage :: ionViewCanEnter() => Trying to fetch NativeStorage content.");
        if (data.email!=null && data.loginType!=null){
            env.navCtrl.setRoot(HomePage);
        }
		}, function(error){
      console.log("Class :: HomePage :: Error in fetching date from NativeStorage");
			console.log(error);
		});
  }
}
