import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calisanlar-dialog',
  templateUrl: './uyeler-dialog.component.html',
  styleUrls: ['./uyeler-dialog.component.css']
})
export class UyelerDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Uyeler;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<UyelerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Üye Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Musteri_id:[this.yeniKayit.Musteri_id],
      Ad:[this.yeniKayit.Ad],
      Soyad:[this.yeniKayit.Soyad],
      Tel_no:[this.yeniKayit.Tel_no],
      Eposta_adresi:[this.yeniKayit.Eposta_adresi],
      Adres:[this.yeniKayit.Adres]
    });
  }

}
