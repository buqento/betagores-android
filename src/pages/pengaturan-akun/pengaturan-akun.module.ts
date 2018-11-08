import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PengaturanAkunPage } from './pengaturan-akun';

@NgModule({
  declarations: [
    PengaturanAkunPage,
  ],
  imports: [
    IonicPageModule.forChild(PengaturanAkunPage),
  ],
})
export class PengaturanAkunPageModule {}
