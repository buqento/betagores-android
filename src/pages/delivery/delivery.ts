import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProdukPage } from '../produk/produk';

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  responseData: any;
  items: any;
  userDetails: any;
  PushProduk: any;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public navParams: NavParams) {
      this.PushProduk = ProdukPage;

      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;

  }

  ionViewDidLoad() {
    this.getPesanan();
  }

  pageProduk(){
    this.navCtrl.setRoot(ProdukPage);
  }

  getPesanan(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    setTimeout(() => { loading.dismiss(); }, 5000);

    this.authService.getPesanan(this.userDetails.id).then((result) => {
      this.responseData = result;
      this.items = this.responseData;
      loading.dismiss();
    })
  }

}
