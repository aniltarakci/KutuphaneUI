import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { UyelerDialogComponent } from '../dialogs/uyeler-dialog/uyeler-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Uyeler',
  templateUrl: './Uyeler.component.html',
  styleUrls: ['./Uyeler.component.css']
})
export class UyelerComponent implements OnInit {
  uyeler: Uyeler[];
  displayedColumns = ['Musteri_id','Ad','Soyad','Tel_no', 'Eposta_adresi', 'Adres', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UyelerDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.uyelerliste();
  }

  uyelerliste() {
    this.apiServis.uyelerliste().subscribe(d=>{
      this.uyeler = d
    //  console.log(this.uyeler)
    this.dataSource = new MatTableDataSource(this.uyeler);
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
    var yeniKayit:Uyeler=new Uyeler();
    this.dialogRef=this.matDialog.open(UyelerDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.uyelerekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.uyelerliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Uyeler){
    this.dialogRef=this.matDialog.open(UyelerDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Musteri_id= d.Musteri_id;
      kayit.Ad= d.Ad;
      kayit.Soyad= d.Soyad;
      kayit.Tel_no= d.Tel_no;
      kayit.Eposta_adresi= d.Eposta_adresi;
      kayit.Adres= d.Adres;

      this.apiServis.uyelerduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Uyeler){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Musteri_id + " ID'li üye silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.uyelersil(kayit.Musteri_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.uyelerliste();
        }
      });
    }
    });
}

}