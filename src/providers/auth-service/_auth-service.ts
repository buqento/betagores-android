import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://localhost/api/betagores/';
// let apiUrl = 'http://dpm-ptsp-kabmbd.com/api/betagores/'; //Slim

let apiUrl = 'http://localhost/api/betagores_ph/'; //Phalcon


@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  postData(credentials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  getProduks() {
    return new Promise(resolve => {
      this.http.get(apiUrl+'produks').subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  getPesanans(penggunaId) {
    return new Promise(resolve => {
      this.http.get(apiUrl+'getPesanans/'+penggunaId).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  getTotalPesananById(penggunaId) {
    return new Promise(resolve => {
      this.http.get(apiUrl+'getTotalPesananById/'+penggunaId).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  
}