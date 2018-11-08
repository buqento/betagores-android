import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProdukPage } from '../produk/produk';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  userDetails: any;
  responseData : any;
  userData = {
    "username": "",
    "password": "",
    "namaLengkap": "",
    "email": "",
    "telepon":"",
    "alamat":""
  };
  password_type: string = 'password';
  constructor(
    public navCtrl: NavController,  
    public authService: AuthService, 
    public toastController: ToastController,
    public loadingCtrl: LoadingController) {
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  signup(){
    
    if(this.userData.username && 
      this.userData.password && 
      this.userData.namaLengkap && 
      this.userData.email && 
      this.userData.telepon &&
      this.userData.alamat){
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();
      setTimeout(() => { loading.dismiss(); }, 5000);
      this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      
        if(this.responseData.userData){
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            const data = JSON.parse(localStorage.getItem('userData'));
            this.userDetails = data.userData;
            
            localStorage.setItem('userOrder','{"userOrder":{"jumlah":"0"}}');
            this.navCtrl.setRoot(ProdukPage);
        }else{ 
          this.presentToast('Username/Email/Password tidak valid.');
        }
        loading.dismiss();
      }, (err) => {
        // Error log
      })
    }else{
      this.presentToast("Masukkan data Anda.");
    }
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });
    toast.present();
  }

}
