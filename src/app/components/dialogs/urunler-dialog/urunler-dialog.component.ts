import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urunler } from 'src/app/models/Urunler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urunler-dialog',
  templateUrl: './urunler-dialog.component.html',
  styleUrls: ['./urunler-dialog.component.css']
})
export class UrunlerDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Urunler;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<UrunlerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Ürün Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Ürün Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Urun_id:[this.yeniKayit.Urun_id],
      Urun_adi:[this.yeniKayit.Urun_adi],
      Kategori_id:[this.yeniKayit.Kategori_id],
      Firma_id:[this.yeniKayit.Firma_id],
      Alis_fiyat:[this.yeniKayit.Alis_fiyat]
    });
  }

}
