import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Kategoriler-dialog',
  templateUrl: './kategoriler-dialog.component.html',
  styleUrls: ['./kategoriler-dialog.component.css']
})
export class KategorilerDialogComponent implements OnInit {
dialogBaslik:string;
islem: string;
frm:FormGroup;
yeniKayit:Kategoriler;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<KategorilerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Kategori Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Kategori Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      Kategori_Adi:[this.yeniKayit.Kategori_Adi],
    });
  }

}
