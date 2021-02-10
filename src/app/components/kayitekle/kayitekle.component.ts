import { FbservisService } from './../../services/fbservis.service';
import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kayitekle',
  templateUrl: './kayitekle.component.html',
  styleUrls: ['./kayitekle.component.css']
})
export class KayitekleComponent implements OnInit {
  secKayit: Kayit = new Kayit();
  uid: string;
  adsoyad: string;
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
  }
  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih = new Date();
    this.secKayit.user = this.adsoyad;
    this.secKayit.kayTarih = tarih.getTime().toString();
    this.secKayit.duzTarih = tarih.getTime().toString();
    this.fbServis.KayitEkle(this.secKayit).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }
}
