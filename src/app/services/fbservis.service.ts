import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Yorum } from './../models/yorum';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  private dbYorum= '/Yorumlar';

  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  yorumRef: AngularFireList<Yorum> = null;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
    this.yorumRef = db.list(this.dbYorum);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  KayitListele() {
    return this.kayitRef;
  }
  KayitListeleByUID(uid: string) {
    return this.db.list("/Kayitlar", q => q.orderByChild("uid").equalTo(uid));
  }
  KayitByKey(key: string) {
    return this.db.object("/Kayitlar/" + key);
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
  YorumEkle(yrm: Yorum) {
    return this.yorumRef.push(yrm);
  }
  YorumListeleUID(uid: string) {
    return this.db.list("/Yorumlar", q => q.orderByChild("icerikid").equalTo(uid).limitToLast(5));
  }
  YorumSil(key: string) {
    return this.yorumRef.remove(key);
  }
  KayitListeleByKategori(kate: string) {
    return this.db.list("/Kayitlar", q => q.orderByChild("kategori").equalTo(kate));
  }

  
}
