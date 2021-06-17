import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeslimAlindi } from 'src/app/models/TeslimAlindi';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-TeslimAlindi-dialog',
  templateUrl: './TeslimAlindi-dialog.component.html',
  styleUrls: ['./TeslimAlindi-dialog.component.css']
})
export class TeslimAlindiDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:TeslimAlindi;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<TeslimAlindiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Teslimat Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Teslimat Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Musteri_id:[this.yeniKayit.Musteri_id],
      Urun_id:[this.yeniKayit.Urun_id],
      Teslim_Alindi:[this.yeniKayit.Teslim_Alindi]
    });
  }

}
