import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any;
  userReady: boolean = false;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
  	public nativeStorage: NativeStorage,
    public navParams: NavParams
  ) {
    console.log("Class :: HomePage :: constructor.", navParams);
  }

  ionViewCanEnter(){
    console.log("Class :: HomePage :: ionViewCanEnter().");
		let env = this;
		this.nativeStorage.getItem('userData')
		  .then(function (data){
        console.log("Class :: HomePage :: ionViewCanEnter() => Trying to fetch NativeStorage content.");
		     env.user = {
	         name: data.name,
	         email: data.email,
	         picture: data.picture,
           loginType: data.loginType
		     };
				env.userReady = true;
		}, function(error){
      console.log("Class :: HomePage :: Error in fetching date from NativeStorage");
			console.log(error);
		});
	}

  ionViewDidLoad() {
    console.log("Class :: HomePage :: ionViewDidLoad().");
  }

  doFbLogout(){
    console.log("Class :: HomePage :: doFbLogout() :: Logout Button was a hit.");
		var nav = this.navCtrl;
		let env = this;
    env.nativeStorage.remove('userData');
    nav.setRoot(LoginPage);
		this.fb.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
      console.log("Class :: HomePage :: doFbLogout() :: Facebook Logout is successfull.");
		}, function(error){
      console.log("Class :: HomePage :: doFbLogout() :: Error in logging out the user from Facebook App");
			console.log(error);
		});
	}

  doMobileAppLogout(){
    console.log("Class :: HomePage :: doMobileAppLogout() :: Logout Button was a hit.");
    var nav = this.navCtrl;
		let env = this;
    env.nativeStorage.remove('userData');
    nav.setRoot(LoginPage);
  }

}
