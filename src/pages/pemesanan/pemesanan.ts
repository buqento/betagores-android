import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AuthService } from '../../providers/auth-service/auth-service';
import { OrderPage } from '../order/order';
import { ProdukPage } from '../produk/produk';

@IonicPage()
@Component({
  selector: 'page-pemesanan',
  templateUrl: 'pemesanan.html',
})
export class PemesananPage {

  kode:any;
  nama:any;
  gambar:any;
  harga:any;
  jumlah:any;

  userDetails: any;
  
  vQty:any = 1;
  data = { 
    jumlah:1, 
    keterangan:""
  }
  minus:boolean = false;
  hrg:any;
  hargaItem:any;
  vHarga:any;


  constructor(public navCtrl: NavController, 
    private sqlite: SQLite,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      this.kode = navParams.get('pKode');
      this.nama = navParams.get('pNama');
      this.gambar = navParams.get('pGambar');
      this.harga = navParams.get('pHarga');

      this.vHarga = this.convertCurr(this.harga);

      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    this.hitung();
    this.generateTable();
  }

  generateTable(){
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE keranjang (rowid INTEGER PRIMARY KEY, kode TEXT, nama TEXT, harga TEXT, jumlah TEXT, keterangan TEXT)', [])
          .then(() => console.log('Table created'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  addToKeranjang() {
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      // memeriksa kode pada tabel
      db.executeSql('SELECT rowid FROM keranjang WHERE kode=?', [this.kode])
      .then(res => {
        if(res.rows.length>0) {
          this.presentAlert('Ups!','Anda telah memilih produk ini sebelumnya.');
          this.navCtrl.push(OrderPage);
        }else{
          db.executeSql('INSERT INTO keranjang VALUES(NULL,?,?,?,?,?)',
          [this.kode, this.nama, this.hrg, this.data.jumlah, this.data.keterangan])
            .then(() => {
              this.showConfirm();
              //Update jumlah data keranjang
              // const dataBasket = JSON.parse(localStorage.getItem('userBasket'));
              // this.userDataBasket = dataBasket.userBasket;
              // let jmlBasket = parseInt(this.userDataBasket.jml) + 1;
              // localStorage.setItem('userBasket','{"userBasket":{"jml":"'+jmlBasket+'"}}');
            })
        }
      })
    })
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Yeah!',
      message: 'Produk telah ditambahkan ke dalam keranjang.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(ProdukPage);
          }
        },
        {
          text: 'Lihat Keranjang',
          handler: () => {
            this.navCtrl.push(OrderPage);
          }
        }
      ]
    });
    confirm.present();
  }

  presentAlert(tit,sub) {
    let alert = this.alertCtrl.create({
      title: tit,
      subTitle: sub,
      buttons: ['Ok']
    });
    alert.present();
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

  tambah(){
    this.data.jumlah ++;
    let jml:any = this.data.jumlah;
    this.vQty = jml;
    if(jml > 1){
      this.minus = true;
    }
  }

  kurang(){
    this.data.jumlah --;
    let jml:any = this.data.jumlah;
    this.vQty = jml;
    if(jml < 2){
      this.minus = !this.minus;
    }
  }

  hitung(){
    let jml:any = this.data.jumlah;
    this.hrg = jml * parseInt(this.harga);
    this.hargaItem = this.convertCurr(this.hrg);
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

}
