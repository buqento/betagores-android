import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PengaturanAkunPage } from '../pengaturan-akun/pengaturan-akun';
import { DeliveryPage } from '../delivery/delivery';

@IonicPage()
@Component({
  selector: 'page-pengaturan',
  templateUrl: 'pengaturan.html',
})
export class PengaturanPage {

  userDetails: any;
  pushDelivery: any;
  pushPengaturanAkun: any;
  vAlamat: any;

  constructor(public navCtrl: NavController) {
      this.pushDelivery = DeliveryPage;
      this.pushPengaturanAkun = PengaturanAkunPage;

      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.vAlamat = this.userDetails.alamat;
  }
  
  convertCurr(angka){
    var rev     = parseInt(angka, 10).toString().split('').reverse().join('');
    var rev2    = '';
    for(var i = 0; i < rev.length; i++){
        rev2  += rev[i];
        if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
            rev2 += ',';
        }
    }
    return rev2.split('').reverse().join('');
  }
  
  pengaturanAkun(nama, telepon, alamat){
    let data = {
      pNama: nama,
      pTelepon: telepon,
      pAlamat: alamat
    }
    this.navCtrl.push(PengaturanAkunPage, data);
  }

  logOut(){
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

}
