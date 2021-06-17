import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Calisanlar } from 'src/app/models/Calisanlar';
import { ApiService } from 'src/app/services/api.service';
import { CalisanlarDialogComponent } from '../dialogs/calisanlar-dialog/calisanlar-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Calisanlar',
  templateUrl: './Calisanlar.component.html',
  styleUrls: ['./Calisanlar.component.css']
})
export class CalisanlarComponent implements OnInit {
  calisanlar: Calisanlar[];
  displayedColumns = ['Calisan_id','Ad','Soyad','Tel_no','Adres', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<CalisanlarDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.calisanlarliste();
  }

  calisanlarliste() {
    this.apiServis.calisanlarliste().subscribe(d=>{
      this.calisanlar = d
    //  console.log(this.calisanlar)
    this.dataSource = new MatTableDataSource(this.calisanlar);
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
    var yeniKayit:Calisanlar=new Calisanlar();
    this.dialogRef=this.matDialog.open(CalisanlarDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.calisanlarekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.calisanlarliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Calisanlar){
    this.dialogRef=this.matDialog.open(CalisanlarDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Ad= d.Ad;
      kayit.Soyad= d.Soyad;
      kayit.Tel_no= d.Tel_no;
      kayit.Adres= d.Adres;

      this.apiServis.calisanlarduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Calisanlar){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Ad + " İsimli çalışan silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.calisanlarsil(kayit.Calisan_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.calisanlarliste();
        }
      });
    }
    });
}

}