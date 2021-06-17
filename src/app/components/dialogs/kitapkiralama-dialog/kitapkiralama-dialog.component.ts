import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KitapKiralama } from 'src/app/models/KitapKiralama';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kitapkiralama-dialog',
  templateUrl: './kitapkiralama-dialog.component.html',
  styleUrls: ['./kitapkiralama-dialog.component.css']
})
export class KitapKiralamaDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:KitapKiralama;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<KitapKiralamaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Kitap Kiralayan Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Kitap Kiralayan Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Calisan_id:[this.yeniKayit.Calisan_id],
      Musteri_id:[this.yeniKayit.Musteri_id],
      Urun_id:[this.yeniKayit.Urun_id],
      Kiralama_tarihi:[this.yeniKayit.Kiralama_tarihi],
      TeslimAlma_tarihi:[this.yeniKayit.TeslimAlma_tarihi]
    });
  }

}
