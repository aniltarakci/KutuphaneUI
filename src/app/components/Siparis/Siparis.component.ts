import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Siparis } from 'src/app/models/Siparis';
import { ApiService } from 'src/app/services/api.service';
import { SiparisDialogComponent } from '../dialogs/siparis-dialog/siparis-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Siparis',
  templateUrl: './Siparis.component.html',
  styleUrls: ['./Siparis.component.css']
})
export class SiparisComponent implements OnInit {
  siparis: Siparis[];
  displayedColumns = ['Siparis_id','Urun_id','Adet','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<SiparisDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.siparisliste();
  }

  siparisliste() {
    this.apiServis.siparisliste().subscribe(d=>{
      this.siparis = d
    //  console.log(this.siparis)
    this.dataSource = new MatTableDataSource(this.siparis);
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
    var yeniKayit:Siparis=new Siparis();
    this.dialogRef=this.matDialog.open(SiparisDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.siparisekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.siparisliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:Siparis){
    this.dialogRef=this.matDialog.open(SiparisDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Siparis_id= d.Siparis_id;
      kayit.Urun_id= d.Urun_id;
      kayit.Adet= d.Adet;

      this.apiServis.siparisduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Siparis){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Siparis_id + " ID'li sipariş silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.siparissil(kayit.Siparis_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.siparisliste();
        }
      });
    }
    });
}

}