import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PemesananPage } from './pemesanan';

@NgModule({
  declarations: [
    PemesananPage,
  ],
  imports: [
    IonicPageModule.forChild(PemesananPage),
  ],
})
export class PemesananPageModule {}
