import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProdukPage } from '../produk/produk';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DeliveryPage } from '../delivery/delivery';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  totalHarga: any;
  vTotalHarga: any;
  userDetails: any;
  empty: boolean = true;
  notEmpty: boolean = true;

  userPostData = {
    "penggunaId": "",
    "produkId": "",
    "jumlah": "",
    "totalBayar": "",
    "status": "",
    "keterangan": ""
  }

  items:any = [];

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    private sqlite: SQLite,
    public navParams: NavParams) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    this.checkTable();
    this.vTotalHarga = 0;
  }

  pageProduk(){
    this.navCtrl.setRoot(ProdukPage);
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
          this.navCtrl.push(ProdukPage);
        }else{
          this.getData();
        }
      });

    }).catch(e => console.log(e));

  }

  deleteProduk(rowid) {
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      //hapus data
      db.executeSql('DELETE FROM keranjang WHERE rowid=?', [rowid])
      .then(res => {
        this.checkTable();
      })

      .catch(e => console.log(e));
    }).catch(e => console.log(e));

  }

  getData(){
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        //tampilkan semua data
        db.executeSql('SELECT * FROM keranjang ORDER BY rowid DESC', [])
        .then(res => {
          this.items = [];
          for(var i=0; i<res.rows.length; i++) {
            this.items.push({
              rowid:res.rows.item(i).rowid,
              kode: res.rows.item(i).kode,
              nama: res.rows.item(i).nama,
              harga: res.rows.item(i).harga,
              jumlah: res.rows.item(i).jumlah,
              keterangan: res.rows.item(i).keterangan
            })
          }
        })

        //hitung jumlah total bayar
        db.executeSql('SELECT SUM(harga) AS totalHarga FROM keranjang', [])
        .then(res => {
          if(res.rows.length>0) {
            this.totalHarga = parseInt(res.rows.item(0).totalHarga);
            this.vTotalHarga = this.convertCurr(this.totalHarga);
          }else{
            this.vTotalHarga = 0;
          }
        })

      })
      .catch(e => console.log(e));

  }


  confirmBayar() {
    let alert = this.alertCtrl.create({
      title: 'Pembayaran',
      message: 'Lakukan pembayaran semua produk?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.postData();
          }
        }
      ]
    });
    alert.present();
  }

  postData(){
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      //pilih semua data
      db.executeSql('SELECT * FROM keranjang', [])
      .then(res => {
        //add data to table basket
        for(var i=0; i<res.rows.length; i++) {
          this.userPostData.penggunaId = this.userDetails.id;
          this.userPostData.produkId = res.rows.item(i).kode;
          this.userPostData.jumlah = res.rows.item(i).jumlah;
          this.userPostData.totalBayar = res.rows.item(i).harga;
          this.userPostData.status = "0";
          this.userPostData.keterangan = res.rows.item(i).keterangan;
          this.authService.postData(this.userPostData, 'addToPesanan');
        }
        this.prepareNewOrder();
        this.navCtrl.setRoot(DeliveryPage);
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  
  prepareNewOrder() {
    this.sqlite.create({
      name: 'betagor.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      //hapus semua data
      db.executeSql('DELETE FROM keranjang', [])
        .then(() => {
          console.log('Keranjang deleted.');
          
        })

    })
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
