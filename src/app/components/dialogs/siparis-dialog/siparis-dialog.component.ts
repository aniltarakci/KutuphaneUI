import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Siparis } from 'src/app/models/Siparis';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-siparis-dialog',
  templateUrl: './siparis-dialog.component.html',
  styleUrls: ['./siparis-dialog.component.css']
})
export class SiparisDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Siparis;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<SiparisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Sipariş Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Sipariş Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Siparis_id:[this.yeniKayit.Siparis_id],
      Urun_id:[this.yeniKayit.Urun_id],
      Adet:[this.yeniKayit.Adet]
    });
  }

}
