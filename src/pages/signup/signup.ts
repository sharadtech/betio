import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController, Loading, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  REGISTER_URL: string = 'http://localhost:9999/v1/user/add';

  signupForm:any ={
    email:null,
    password:null,
    confirmPassword:null,
    firstname:null,
    lastname:null
  }
  showFields:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nativeStorage : NativeStorage,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alerCtrl: AlertController
  ) {
    console.log("Class :: SignupPage :: constructor().");
    console.log("Class :: SignupPage :: constructor() :: showFields = "+this.showFields);
  }

  signIn(){
    console.log("Class :: SignupPage :: signIn().");
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log("Class :: SignupPage :: ionViewDidLoad().");
    console.log("Class :: SignupPage :: ionViewDidLoad() :: showFields = "+this.showFields);
  }

  ionViewCanEnter(){
    console.log("Class :: SignupPage :: ionViewCanEnter().");
    setTimeout(this.showFields = true, 400);
    console.log("Class :: SignupPage :: ionViewCanEnter() :: showFields = "+this.showFields);
  }

}
