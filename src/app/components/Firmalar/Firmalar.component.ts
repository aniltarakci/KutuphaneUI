import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Firmalar } from 'src/app/models/Firmalar';
import { ApiService } from 'src/app/services/api.service';
import { FirmalarDialogComponent } from '../dialogs/firmalar-dialog/firmalar-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Firmalar',
  templateUrl: './Firmalar.component.html',
  styleUrls: ['./Firmalar.component.css']
})
export class FirmalarComponent implements OnInit {
  firmalar: Firmalar[];
  displayedColumns = ['Firma_id','Firma_adi','Tel','Fax','Eposta_adresi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<FirmalarDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.firmalarliste();
  }

  firmalarliste() {
    this.apiServis.firmalarliste().subscribe(d=>{
    this.firmalar = d
    //  console.log(this.firmalar)
    this.dataSource = new MatTableDataSource(this.firmalar);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }

  Filtrele (e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit:Firmalar=new Firmalar();
    this.dialogRef=this.matDialog.open(FirmalarDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.firmalarekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.firmalarliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Firmalar){
    this.dialogRef=this.matDialog.open(FirmalarDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Firma_adi= d.Firma_adi;
      kayit.Tel= d.Tel;
      kayit.Fax= d.Fax;
      kayit.Eposta_adresi= d.Eposta_adresi;

      this.apiServis.firmalarduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Firmalar){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Firma_adi + " İsimli Firma silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.firmalarsil(kayit.Firma_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.firmalarliste();
        }
      });
    }
    });
}

}