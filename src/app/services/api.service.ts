import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calisanlar } from '../models/Calisanlar';
import { Firmalar } from '../models/Firmalar';
import { Kategoriler } from '../models/Kategoriler';
import { KitapKiralama } from '../models/KitapKiralama';
import { Siparis } from '../models/Siparis';
import { TeslimAlindi } from '../models/TeslimAlindi';
import { Urunler } from '../models/Urunler';
import { Uyeler } from '../models/Uyeler';
import { sonuc } from '../models/sonuc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl="http://localhost:55329/api/";
constructor(
  public http: HttpClient
) { }

calisanlarliste(){
  return this.http.get<Calisanlar[]>(this.apiUrl+"calisanlarliste");
}

calisanlarbyid(Calisan_id:string){
  return this.http.get<Calisanlar>(this.apiUrl+"calisanlarbyid/"+Calisan_id)
}

calisanlarekle(Ad:Calisanlar){
  return this.http.post<any>(this.apiUrl+"calisanlarekle",Ad)
}

calisanlarduzenle(Ad:Calisanlar){
  return this.http.put<sonuc>(this.apiUrl+"calisanlarduzenle", Ad)
}

calisanlarsil(Calisan_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"calisanlarsil/"+Calisan_id)
}


firmalarliste(){
  return this.http.get<any>(this.apiUrl+"firmalarliste");
}

firmalarbyid(Firma_id:string){
  return this.http.get<Firmalar>(this.apiUrl+"firmalarbyid/"+Firma_id)
}

firmalarekle(Firma_adi:Firmalar){
  return this.http.post<any>(this.apiUrl+"firmalarekle",Firma_adi)
}

firmalarduzenle(Firma_adi:Firmalar){
  return this.http.put<sonuc>(this.apiUrl+"firmalarduzenle", Firma_adi)
}

firmalarsil(Firma_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"firmalarsil/"+Firma_id)
}


kategorilerliste(){
  return this.http.get<any>(this.apiUrl+"kategorilerliste");
}

kategorilerbyid(Kategori_id:string){
  return this.http.get<Kategoriler>(this.apiUrl+"kategorilerbyid/"+Kategori_id)
}

kategorilerekle(Kategori_adi:Kategoriler){
  return this.http.post<any>(this.apiUrl+"kategorilerekle",Kategori_adi)
}

kategorilerduzenle(Kategori_adi:Kategoriler){
  return this.http.put<sonuc>(this.apiUrl+"kategorilerduzenle", Kategori_adi)
}

kategorilersil(Kategori_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"kategorilersil/"+Kategori_id)
}


kitapkiralamaliste(){
  return this.http.get<any>(this.apiUrl+"kitapkiralamaliste");
}

kitapkiralamabyid(Musteri_id:string){
  return this.http.get<KitapKiralama>(this.apiUrl+"kitapkiralamabyid/"+Musteri_id)
}

kitapkiralamaekle(Musteri_id:KitapKiralama){
  return this.http.post<any>(this.apiUrl+"kitapkiralamaekle",Musteri_id)
}

kitapkiralamaduzenle(Musteri_id:KitapKiralama){
  return this.http.put<sonuc>(this.apiUrl+"kitapkiralamaduzenle", Musteri_id)
}

kitapkiralamasil(Musteri_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"kitapkiralamasil/"+Musteri_id)
}


siparisliste(){
  return this.http.get<any>(this.apiUrl+"siparisliste");
}

siparisbyid(Siparis_id:string){
  return this.http.get<Siparis>(this.apiUrl+"siparisbyid/"+Siparis_id)
}

siparisekle(Siparis_id:Siparis){
  return this.http.post<any>(this.apiUrl+"siparisekle",Siparis_id)
}

siparisduzenle(Siparis_id:Siparis){
  return this.http.put<sonuc>(this.apiUrl+"siparisduzenle", Siparis_id)
}

siparissil(Siparis_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"siparissil/"+Siparis_id)
}


teslimalindiliste(){
  return this.http.get<any>(this.apiUrl+"teslimalindiliste");
}

teslimalindibyid(Musteri_id:string){
  return this.http.get<any>(this.apiUrl+"teslimalindibyid/"+Musteri_id)
}

teslimalindiekle(Musteri_id:TeslimAlindi){
  return this.http.post<any>(this.apiUrl+"teslimalindiekle",Musteri_id)
}

teslimalindiduzenle(Musteri_id:TeslimAlindi){
  return this.http.put<sonuc>(this.apiUrl+"teslimalindiduzenle", Musteri_id)
}

teslimalindisil(Musteri_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"teslimalindisil/"+Musteri_id)
}



urunlerliste(){
  return this.http.get<any>(this.apiUrl+"urunlerliste");
}

urunlerbyid(Urun_id:string){
  return this.http.get<any>(this.apiUrl+"urunlerbyid/"+Urun_id)
}

urunlerekle(Urun_Adi:Urunler){
  return this.http.post<any>(this.apiUrl+"urunlerekle",Urun_Adi)
}

urunlerduzenle(Urun_Adi:Urunler){
  return this.http.put<any>(this.apiUrl+"urunlerduzenle", Urun_Adi)
}

urunlersil(Urun_Adi:string){
  return this.http.delete<any>(this.apiUrl+"urunlersil/"+Urun_Adi)
}



uyelerliste(){
  return this.http.get<any>(this.apiUrl+"uyelerliste");
}

uyelerbyid(Musteri_id:string){
  return this.http.get<Uyeler>(this.apiUrl+"uyelerbyid/"+Musteri_id)
}

uyelerekle(Musteri_id:Uyeler){
  return this.http.post<any>(this.apiUrl+"uyelerekle",Musteri_id)
}

uyelerduzenle(Musteri_id:Uyeler){
  return this.http.put<sonuc>(this.apiUrl+"uyelerduzenle", Musteri_id)
}

uyelersil(Musteri_id:string){
  return this.http.delete<sonuc>(this.apiUrl+"uyelersil/"+Musteri_id)
}

}
