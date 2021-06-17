import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalisanlarComponent } from './components/Calisanlar/Calisanlar.component';
import { FirmalarComponent } from './components/Firmalar/Firmalar.component';
import { HomeComponent } from './components/home/home.component';
import { KategorilerComponent } from './components/Kategoriler/Kategoriler.component';
import { KitapKiralamaComponent } from './components/KitapKiralama/KitapKiralama.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SiparisComponent } from './components/Siparis/Siparis.component';
import { TeslimAlindiComponent } from './components/TeslimAlindi/TeslimAlindi.component';
import { UrunlerComponent } from './components/Urunler/Urunler.component';
import { UyelerComponent } from './components/Uyeler/Uyeler.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  {
    path:'mainnav',
    component: MainNavComponent
  },

  {
    path:'calisanlar',
    component: CalisanlarComponent
  },

  {
    path:'firmalar',
    component: FirmalarComponent
  },

  {
    path:'kategoriler',
    component: KategorilerComponent
  },

  {
    path:'kitapkiralama',
    component: KitapKiralamaComponent
  },

  {
    path:'siparis',
    component: SiparisComponent
  },

  {
    path:'teslimalindi',
    component: TeslimAlindiComponent
  },

  {
    path:'urunler',
    component: UrunlerComponent
  },

  {
    path:'uyeler',
    component: UyelerComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
