import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firmalar } from 'src/app/models/Firmalar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-firmalar-dialog',
  templateUrl: './firmalar-dialog.component.html',
  styleUrls: ['./firmalar-dialog.component.css']
})
export class FirmalarDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Firmalar;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<FirmalarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Firma Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Firma Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Firma_adi:[this.yeniKayit.Firma_adi],
      Tel:[this.yeniKayit.Tel],
      Fax:[this.yeniKayit.Fax],
      Eposta_adresi:[this.yeniKayit.Eposta_adresi]
    });
  }

}
