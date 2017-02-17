import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password  
      }).then((response) => {
        console.log('Login success' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
    })
  }

  twitterlogin() {
    if (this.platform.is('cordova')) {
      let accessToken = '66942106-nYFat8A8U5SUPuZihcNjN6NpDFnBHpnimC3ykjnhZ';
      let secretKey = 'CWFF1cdbkqwnSKxq5sbaIvXCj6N2YjrrmV6nwmD4ESEUv';
      const twitterCreds = firebase.auth.TwitterAuthProvider.credential(accessToken, secretKey);
        firebase.auth().signInWithCredential(twitterCreds).then((res) => {
          let currentuser = firebase.auth().currentUser;
          window.localStorage.setItem('currentuser', JSON.stringify(currentuser.displayName));
          alert(currentuser.displayName);
          this.navCtrl.pop();
        }, (err) => {
          alert('Login not successful' + err);
        })
      
    }
    else {
      this.angfire.auth.login({
        provider: AuthProviders.Twitter,
        method: AuthMethods.Popup
      }).then((response) => {
        console.log('Login success with twitter' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.displayName,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  fblogin() {
    if (this.platform.is('cordova')) {
      Facebook.login(['email', 'public_profile']).then((res) => {
        const facebookCreds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCreds).then((res) => {
          let currentuser = firebase.auth().currentUser;
          window.localStorage.setItem('currentuser', JSON.stringify(currentuser.displayName));
          alert(currentuser.displayName);
          this.navCtrl.pop();
        }, (err) => {
          alert('Login not successful' + err);
        })
      })
    }
    else {
      this.angfire.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      }).then((response) => {
        console.log('Login success with twitter' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.displayName,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
      })
    
    }
  }  

}
