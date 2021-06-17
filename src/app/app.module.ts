import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CalisanlarComponent } from './components/Calisanlar/Calisanlar.component';
import { FirmalarComponent } from './components/Firmalar/Firmalar.component';
import { KategorilerComponent } from './components/Kategoriler/Kategoriler.component';
import { KitapKiralamaComponent } from './components/KitapKiralama/KitapKiralama.component';
import { SiparisComponent } from './components/Siparis/Siparis.component';
import { TeslimAlindiComponent } from './components/TeslimAlindi/TeslimAlindi.component';
import { UrunlerComponent } from './components/Urunler/Urunler.component';
import { UyelerComponent } from './components/Uyeler/Uyeler.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { CalisanlarDialogComponent } from './components/dialogs/calisanlar-dialog/calisanlar-dialog.component';
import { FirmalarDialogComponent } from './components/dialogs/firmalar-dialog/firmalar-dialog.component';
import { KategorilerDialogComponent } from './components/dialogs/kategoriler-dialog/kategoriler-dialog.component';
import { KitapKiralamaDialogComponent } from './components/dialogs/kitapkiralama-dialog/kitapkiralama-dialog.component';
import { SiparisDialogComponent } from './components/dialogs/siparis-dialog/siparis-dialog.component';
import { TeslimAlindiDialogComponent } from './components/dialogs/teslimalindi-dialog/teslimalindi-dialog.component';
import { UrunlerDialogComponent } from './components/dialogs/urunler-dialog/urunler-dialog.component';
import { UyelerDialogComponent } from './components/dialogs/uyeler-dialog/uyeler-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    CalisanlarComponent,
    FirmalarComponent,
    KategorilerComponent,
    KitapKiralamaComponent,
    SiparisComponent,
    TeslimAlindiComponent,
    UrunlerComponent,
    UyelerComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    CalisanlarDialogComponent,
    FirmalarDialogComponent,
    KategorilerDialogComponent,
    KitapKiralamaDialogComponent,
    SiparisDialogComponent,
    TeslimAlindiDialogComponent,
    UrunlerDialogComponent,
    UyelerDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  entryComponents: [
    CalisanlarDialogComponent,
    FirmalarDialogComponent,
    KategorilerDialogComponent,
    KitapKiralamaDialogComponent,
    SiparisDialogComponent,
    TeslimAlindiDialogComponent,
    UrunlerDialogComponent,
    UyelerDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
