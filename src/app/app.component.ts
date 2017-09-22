import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class BetioApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = IntroPage;

  constructor(
    platform: Platform,
    public nativeStorage: NativeStorage,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    console.log("Class :: BetioApp :: constructor");
    platform.ready().then(() => {
      console.log("Class :: BetioApp :: constructor => Platform.Ready State");
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      this.nativeStorage.getItem('user').then( function (data) {
        console.log("Class :: BetioApp :: constructor => Trying to fetch NativeStorage content.");
        // user is previously logged and we have his data
        // we will let him access the app
          env.nav.setRoot(HomePage);
          env.splashScreen.hide();
        }, function (error) {
          console.log("Class :: BetioApp :: constructor => Error detected fetching data from NativeStorage.");
          //we don't have the user data so we will ask him to log in
          env.nav.setRoot(IntroPage);
          env.splashScreen.hide();
        });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  ionViewDidLoad() {
    console.log("Class :: BetioApp :: ionViewDidLoad()");
  }

  ionViewCanEnter(){
    console.log("Class :: BetioApp :: ionViewCanEnter().");
  }

}
