import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://localhost/api/betagores/';
let apiSlim = 'http://dpm-ptsp-kabmbd.com/api/betagores/'; //Slim

// let apiUrl = 'http://localhost/api/betagores_ph/'; //Phalcon
let apiPhalcon = 'http://dpm-ptsp-kabmbd.com/api/betagores_ph/'; //Phalcon

// http://localhost/api/betagores_ph/produks
// http://localhost/api/betagores_ph/pesanans/1
// http://localhost/api/betagores_ph/signup
// http://localhost/api/betagores_ph/login
// http://localhost/api/betagores_ph/postpesanan
// http://localhost/api/betagores_ph/updateprofil/2

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  postData(credentials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiSlim + type, JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        resolve(res.json()); //PHP Slim
        // resolve(res); //Phalcon
      }, (err) => {
        reject(err);
      });
    });
  }

  getProduks() {
    return new Promise(resolve => {
      this.http.get(apiPhalcon+'produks').subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  getTotPesanans(penggunaId) {
    return new Promise(resolve => {
      this.http.get(apiPhalcon+'totpesanans/'+penggunaId).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }
  
  getPesanan(penggunaId) {
    return new Promise(resolve => {
      this.http.get(apiPhalcon+'pesanans/'+penggunaId).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }
  
}