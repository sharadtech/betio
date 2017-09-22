import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  	public nativeStorage: NativeStorage
  ) {
    console.log("Class :: HomePage :: constructor.");
  }

  ionViewCanEnter(){
    console.log("Class :: HomePage :: ionViewCanEnter().");
		let env = this;
		this.nativeStorage.getItem('user')
		  .then(function (data){
        console.log("Class :: HomePage :: ionViewCanEnter() => Trying to fetch NativeStorage content.");
		     env.user = {
	         name: data.name,
	         gender: data.gender,
	         picture: data.picture
		     };
				env.userReady = true;
		}, function(error){
      console.log("Class :: HomePage :: Error in fetching date from NativeStorage");
			console.log(error);
		});
	}

  doFbLogout(){
    console.log("Class :: HomePage :: doFbLogout() :: Logout Button was a hit.");
		var nav = this.navCtrl;
		let env = this;
		this.fb.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
      console.log("Class :: HomePage :: doFbLogout() :: Facebook Logout is successfull.");
			env.nativeStorage.remove('user');
			nav.push(LoginPage);
		}, function(error){
      console.log("Class :: HomePage :: doFbLogout() :: Error in logging out the user from Facebook App");
			console.log(error);
		});
	}

}
