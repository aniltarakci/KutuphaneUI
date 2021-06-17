import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Urunler } from 'src/app/models/Urunler';
import { ApiService } from 'src/app/services/api.service';
import { UrunlerDialogComponent } from '../dialogs/urunler-dialog/urunler-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Calisanlar',
  templateUrl: './Urunler.component.html',
  styleUrls: ['./Urunler.component.css']
})
export class UrunlerComponent implements OnInit {
  urunler: Urunler[];
  displayedColumns = ['Urun_id','Urun_adi','Kategori_id','Firma_id','Alis_fiyat', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UrunlerDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.urunlerliste();
  }

  urunlerliste() {
    this.apiServis.urunlerliste().subscribe(d=>{
      this.urunler = d
    //  console.log(this.urunler)
    this.dataSource = new MatTableDataSource(this.urunler);
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
    var yeniKayit:Urunler=new Urunler();
    this.dialogRef=this.matDialog.open(UrunlerDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.urunlerekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.urunlerliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Urunler){
    this.dialogRef=this.matDialog.open(UrunlerDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Urun_id= d.Urun_id;
      kayit.Urun_adi= d.Urun_adi;
      kayit.Kategori_id= d.Kategori_id;
      kayit.Firma_id= d.Firma_id;
      kayit.Alis_fiyat= d.Alis_fiyat;

      this.apiServis.urunlerduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Urunler){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Urun_id + " ID'li ürün silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.urunlersil(kayit.Urun_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.urunlerliste();
        }
      });
    }
    });
}

}