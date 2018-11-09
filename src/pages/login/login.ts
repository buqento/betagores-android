import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { ProdukPage } from '../produk/produk';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  PushSignup: any;
  responseData : any;
  userDetails: any;
  uLat: any;
  uLng: any;
  address: any;
  userData = {"username": "","password": ""};
  userPostData = {"id_user":""};
  dataSet: any;
  categoryData = {};
  password_type: string = 'password';
  splash = true;

  constructor(public navCtrl: NavController, 
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.PushSignup = SignupPage;
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    let userLogin = localStorage.getItem("userData");
		if(userLogin){
      this.navCtrl.setRoot(ProdukPage);
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  getRandom(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  }

  logIn(){
    if(this.userData.username && this.userData.password){
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();
      setTimeout(() => { loading.dismiss(); }, 5000);
      this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
        
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;

        // localStorage.setItem('userOrder','{"userOrder":{"jumlah":"0"}}');
        loading.dismiss();
        this.navCtrl.setRoot(ProdukPage);
      }else{
        loading.dismiss();
        this.presentToast("Username/Password yang Anda masukkan tidak cocok dengan akun mana saja.");
      }
    }, (err) => {
   });

  }else{
    this.presentToast("Inputan data tidak valid!");
  }}

}