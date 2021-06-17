import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calisanlar } from 'src/app/models/Calisanlar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calisanlar-dialog',
  templateUrl: './calisanlar-dialog.component.html',
  styleUrls: ['./calisanlar-dialog.component.css']
})
export class CalisanlarDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Calisanlar;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<CalisanlarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Çalışan Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Çalışan Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Ad:[this.yeniKayit.Ad],
      Soyad:[this.yeniKayit.Soyad],
      Tel_no:[this.yeniKayit.Tel_no],
      Adres:[this.yeniKayit.Adres]
    });
  }

}
