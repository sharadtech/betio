import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { LoadingController, Loading, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  FB_APP_ID: number = 245380678984446;
  LOGIN_URL: string = 'http://localhost:9999/v1/authenticate/user';

  loginForm:any ={
    email:null,
    password:null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb : Facebook,
    public nativeStorage : NativeStorage,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alerCtrl: AlertController
  ) {
    console.log("Class :: LoginPage :: constructor.");
    this.fb.browserInit(this.FB_APP_ID,"v2.8");
  }

  doFacebookLogin(){
    let loadingObject: Loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loadingObject.present();
    console.log("Class :: LoginPage :: doFacebookLogin().");
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;

    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then(function(response){
        console.log("Class :: LoginPage :: doFacebookLogin() :: fb.login().success method :: response :: ", response);
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,gender,email", params)
          .then(function(user){
            console.log("Class :: LoginPage :: doFacebookLogin() :: fb.login().success method :: user :: ", user);
            user.picture = "https://graph.facebook.com/"+ userId + "/picture?type=large";
            //now we have the users info, let's save it in NativeStorage
            env.nativeStorage.setItem('userData',
            {
              name: user.name,
              email: user.email,
              picture: user.picture,
              loginType: 'facebook'
            }).then(function(){
              nav.setRoot(HomePage, user);
            }, function(error){
              console.log("Error occurred at setting data in NativeStorage.");
              console.log(error);
            })
          })
      }, function(error){
        console.log("Class :: LoginPage :: doFacebookLogin() :: fb.login().error method",error);
        loadingObject.dismiss();
      })
  }

  signIn(){
    console.log("Class :: LoginPage :: signIn() :: email = "+this.loginForm.email);
    console.log("Class :: LoginPage :: signIn() :: password = "+this.loginForm.password);
    let loadingObject: Loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    if (this.loginForm.email!=null && this.loginForm.password!=null){
      loadingObject.present();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let data:any = { email:this.loginForm.email, password:this.loginForm.password };
      console.log("Class :: LoginPage :: signIn() :: options = ",options);
      console.log("Class :: LoginPage :: signIn() :: data = ",data);
      let env = this;
      this.http.post(this.LOGIN_URL,data,options)
        .subscribe(
          function(data){
            console.log("Class :: LoginPage :: this.http.post().success :", data.json());
            let responseFromApi = data.json();
            if (responseFromApi.status == 200){
              let user:any = responseFromApi.data;
              env.nativeStorage.setItem('userData',
              {
                name: user.name,
                email: user.email,
                picture: user.picture,
                loginType: 'mobileApp'
              }).then(function(){
                console.log("Class :: LoginPage :: signIn() :: navCtrl has been called to set HomePage as root page.");
                env.navCtrl.setRoot(HomePage);
              }, function(error){
                console.log("Class :: LoginPage :: signIn() :: Error occurred at setting data in NativeStorage after login.");
                console.log(error);
              });
            } else {
              let alert = env.alerCtrl.create({
                title: 'Error',
                message: 'Please enter valid credentials!',
                buttons: ['Try again']
              });
              alert.present()
            }
          },
          function(error){
            console.log("Class :: LoginPage :: this.http.post().error :", error);
            loadingObject.dismiss();
            let alert = env.alerCtrl.create({
              title: 'Error',
              message: 'Please enter valid credentials!',
              buttons: ['Try again']
            });
            alert.present()
          });
    } else {
      let alert = this.alerCtrl.create({
        title: 'Error',
        message: 'Please enter your credentials!',
        buttons: ['Try again']
      });
      alert.present()
    }
  }

  signUp(){
    console.log("Class :: LoginPage :: signUp()");
    this.navCtrl.setRoot(SignupPage);
  }

  ionViewDidLoad() {
    console.log("Class :: LoginPage :: ionViewDidLoad()");
  }

  ionViewCanEnter(){
    console.log("Class :: LoginPage :: ionViewCanEnter().");
  }

}
