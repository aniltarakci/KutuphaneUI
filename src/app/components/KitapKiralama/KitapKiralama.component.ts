import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KitapKiralama } from 'src/app/models/KitapKiralama';
import { ApiService } from 'src/app/services/api.service';
import { KitapKiralamaDialogComponent } from '../dialogs/kitapkiralama-dialog/kitapkiralama-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-KitapKiralama',
  templateUrl: './KitapKiralama.component.html',
  styleUrls: ['./KitapKiralama.component.css']
})
export class KitapKiralamaComponent implements OnInit {
  kitapkiralama: KitapKiralama[];
  displayedColumns = ['Calisan_id','Musteri_id','Urun_id','Kiralama_tarihi','TeslimAlma_tarihi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KitapKiralamaDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService 
  ) { }

  ngOnInit() {
    this.kitapkiralamaliste();
  }

  kitapkiralamaliste() {
    this.apiServis.kitapkiralamaliste().subscribe(d=>{
      this.kitapkiralama = d
    //  console.log(this.kitapkiralama)
    this.dataSource = new MatTableDataSource(this.kitapkiralama);
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
    var yeniKayit:KitapKiralama=new KitapKiralama();
    this.dialogRef=this.matDialog.open(KitapKiralamaDialogComponent, {
      width:'400px',
      data: {
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    this.apiServis.kitapkiralamaekle(d).subscribe((s: sonuc)=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.kitapkiralamaliste();
      }
    });
  }
  });
  }

  Duzenle(kayit:KitapKiralama){
    this.dialogRef=this.matDialog.open(KitapKiralamaDialogComponent, {
      width:'400px',
      data: {
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d){
      kayit.Calisan_id= d.Calisan_id;
      kayit.Musteri_id= d.Musteri_id;
      kayit.Urun_id= d.Urun_id;
      kayit.Kiralama_tarihi= d.Kiralama_tarihi;
      kayit.TeslimAlma_tarihi= d.TeslimAlma_tarihi;

      this.apiServis.kitapkiralamaduzenle(kayit).subscribe((s:sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:KitapKiralama){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.Musteri_id + " ID'li kitap kiralayan silinecektir. Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.kitapkiralamasil(kayit.Calisan_id).subscribe((s: sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.kitapkiralamaliste();
        }
      });
    }
    });
}

}