import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  FB_APP_ID: number = 245380678984446;

  loginForm:any ={
    email:null,
    password:null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb : Facebook,
    public nativeStorage : NativeStorage,
    public http: Http
  ) {
    console.log("Class :: LoginPage :: constructor.");
    this.fb.browserInit(this.FB_APP_ID,"v2.8");
  }

  doFacebookLogin(){
    console.log("Class :: LoginPage :: doFacebookLogin().");
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;

    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
      .then(function(response){
        console.log("Class :: LoginPage :: doFacebookLogin() :: fb.login().success method");
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,gender", params)
          .then(function(user){
            user.picture = "https://graph.facebook.com/"+ userId + "/picture?type=large";
            //now we have the users info, let's save it in NativeStorage
            env.nativeStorage.setItem('user',
            {
              name: user.name,
              gender: user.gender,
              picture: user.picture
            })
            .then(function(){
              nav.push(HomePage);
            }, function(error){
              console.log("Error occurred at setting data in NativeStorage.");
              console.log(error);
            })
          })
      }, function(error){
        console.log("Class :: LoginPage :: doFacebookLogin() :: fb.login().error method",error);
      })
  }

  signIn(){
    console.log("Class :: LoginPage :: signIn() :: email = "+this.loginForm.email);
    console.log("Class :: LoginPage :: signIn() :: password = "+this.loginForm.password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data:any = { email:this.loginForm.email, password:this.loginForm.password };
    console.log("Class :: LoginPage :: signIn() :: options = ",options);
    console.log("Class :: LoginPage :: signIn() :: data = ",data);

    this.http.post('http://localhost:8080/v1/authenticate/user',data,options)
      .subscribe(this.handleSuccessResponse, this.handleError);

  }

  handleSuccessResponse(data) {
    console.log("Class :: LoginPage :: handleSuccessResponse() :", data.json());
    return data;
  }

  handleError(error) {
    console.log("Class :: LoginPage :: handleError() :", error);
    return Observable.throw(error.json().error || 'Server error');
  }

  ionViewDidLoad() {
    console.log("Class :: LoginPage :: ionViewDidLoad()");
  }

  ionViewCanEnter(){
    console.log("Class :: LoginPage :: ionViewCanEnter().");
  }

}
