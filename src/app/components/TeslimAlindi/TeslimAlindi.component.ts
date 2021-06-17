import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeslimAlindi } from 'src/app/models/TeslimAlindi';
import { ApiService } from 'src/app/services/api.service';
import { TeslimAlindiDialogComponent } from '../dialogs/teslimalindi-dialog/teslimalindi-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-TeslimAlindi',
  templateUrl: './TeslimAlindi.component.html',
  styleUrls: ['./TeslimAlindi.component.css']
})
export class TeslimAlindiComponent implements OnInit {
  teslimalindi: TeslimAlindi[];
  displayedColumns = ['Musteri_id','Urun_id','Teslim_Alindi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<TeslimAlindiDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.teslimalindiliste();
  }

  teslimalindiliste() {
    this.apiServis.teslimalindiliste().subscribe(d=>{
      this.teslimalindi = d
    //  console.log(this.teslimalindi)
    this.dataSource = new MatTableDataSource(this.teslimalindi);
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
    var yeniKayit:TeslimAlindi=new TeslimAlindi();
    this.dialogRef=this.matDialog.open(TeslimAlindiDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.teslimalindiekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.teslimalindiliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:TeslimAlindi){
    this.dialogRef=this.matDialog.open(TeslimAlindiDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Musteri_id= d.Musteri_id;
      kayit.Urun_id= d.Urun_id;
      kayit.Teslim_Alindi= d.Teslim_Alindi;

      this.apiServis.teslimalindiduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:TeslimAlindi){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Musteri_id + " ID'li teslimat silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.teslimalindisil(kayit.Musteri_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.teslimalindiliste();
        }
      });
    }
    });
}

}