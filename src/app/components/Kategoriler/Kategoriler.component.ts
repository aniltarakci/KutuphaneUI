import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { ApiService } from 'src/app/services/api.service';
import { KategorilerDialogComponent } from '../dialogs/kategoriler-dialog/kategoriler-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Kategoriler',
  templateUrl: './Kategoriler.component.html',
  styleUrls: ['./Kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {
  Kategoriler: Kategoriler[];
  displayedColumns = ['Kategori_id','Kategori_Adi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KategorilerDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.kategorilerliste();
  }

  kategorilerliste() {
    this.apiServis.kategorilerliste().subscribe(d=>{
      this.Kategoriler = d
    //  console.log(this.kategoriler)
    this.dataSource = new MatTableDataSource(this.Kategoriler);
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
    var yeniKayit:Kategoriler=new Kategoriler();
    this.dialogRef=this.matDialog.open(KategorilerDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.kategorilerekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.kategorilerliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Kategoriler){
    this.dialogRef=this.matDialog.open(KategorilerDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Kategori_Adi= d.Kategori_Adi;

      this.apiServis.kategorilerduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Kategoriler){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Kategori_Adi + " İsimli kategori silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.kategorilersil(kayit.Kategori_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.kategorilerliste();
        }
      });
    }
    });
}

}