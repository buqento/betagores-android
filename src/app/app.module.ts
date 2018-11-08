import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProdukPage } from '../pages/produk/produk';
import { AuthService } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { PemesananPage } from '../pages/pemesanan/pemesanan';
import { SQLite } from '@ionic-native/sqlite';
import { OrderPage } from '../pages/order/order';
import { PengaturanPage } from '../pages/pengaturan/pengaturan';
import { PengaturanAkunPage } from '../pages/pengaturan-akun/pengaturan-akun';
import { DeliveryPage } from '../pages/delivery/delivery';

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    ProdukPage,
    PemesananPage,
    OrderPage,
    DeliveryPage,
    PengaturanPage,
    PengaturanAkunPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    ProdukPage,
    PemesananPage,
    OrderPage,
    DeliveryPage,
    PengaturanPage,
    PengaturanAkunPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, SQLite
  ]
})
export class AppModule {}