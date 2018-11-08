import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PengaturanPage } from '../pengaturan/pengaturan';

@IonicPage()
@Component({
  selector: 'page-pengaturan-akun',
  templateUrl: 'pengaturan-akun.html',
})
export class PengaturanAkunPage {
  userDetails: any;
  responseData: any;
  userData = {
    "id": "",
    "namaLengkap": "",
    "telepon":"",
    "alamat":""
  };

  nama: any;
  telepon: any;
  alamat: any;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService,
    public NavParams: NavParams) {
      this.nama = NavParams.get('pNama');
      this.telepon = NavParams.get('pTelepon');
      this.alamat = NavParams.get('pAlamat');
      
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    this.userData.id = this.userDetails.id;
    this.userData.namaLengkap = this.nama;
    this.userData.telepon = this.telepon;
    this.userData.alamat = this.alamat;
  }

  updateProfil(){
    if(this.userData.id &&
      this.userData.namaLengkap && 
      this.userData.telepon &&
      this.userData.alamat){
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();
      setTimeout(() => { loading.dismiss(); }, 5000);
      this.authService.postData(this.userData,'updateProfil').then((result) => {
      this.responseData = result;     
        if(this.responseData.userData){
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            this.navCtrl.setRoot(PengaturanPage);
        }else{ 
          this.presentToast("Terjadi kesalahan pada server.");
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
    let toast = this.toastCtrl.create({
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
