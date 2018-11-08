import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PemesananPage } from '../pemesanan/pemesanan';
import { PengaturanPage } from '../pengaturan/pengaturan';
import { DeliveryPage } from '../delivery/delivery';
import { OrderPage } from '../order/order';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-produk',
  templateUrl: 'produk.html',
})
export class ProdukPage {
  PushDelivery: any;
  PushPemesanan: any;
  PushPengaturan: any;
  responseData: any;
  dataSet: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    public authService: AuthService,
    private sqlite: SQLite,
    public navParams: NavParams) {
      this.PushPemesanan = PemesananPage;
      this.PushPengaturan = PengaturanPage;
      this.PushDelivery = DeliveryPage;
  }

  ionViewDidLoad() {
    this.getProduks();
  }

  checkTable(){
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //periksa jumlah data
      db.executeSql('SELECT rowid FROM keranjang', [])
      .then(res => {
        if(res.rows.length == 0) {
          this.presentAlert('Ups!', 'Anda belum memilih produk.');
        }

        if(res.rows.length > 0) {
          this.navCtrl.push(OrderPage);
        }

      });

    }).catch(e => console.log(e));

  }

  presentAlert(tit,sub) {
    let alert = this.alertCtrl.create({
      title: tit,
      subTitle: sub,
      buttons: ['Ok']
    });
    alert.present();
  }

  getProduks(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    setTimeout(() => { loading.dismiss(); }, 5000);

    this.authService.getProduks().then((result) => {
      this.responseData = result;
      this.dataSet = this.responseData;
      loading.dismiss();
    })
  }

  openPemesanan(id, nama, gambar, harga, kode){
    let data = {
      pId: id,
      pNama: nama,
      pGambar: gambar,
      pHarga: harga,
      pKode: kode
    }
    this.navCtrl.push(PemesananPage, data);
  }
}
