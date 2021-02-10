import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adsoyad: string;
  uid: string;
  kayitlar: Kayit[];
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

  }
  KayitListele() {
    this.fbServis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }


  ToastUygula() {
    this.toast.success("Mesajımız", "Başlık", { positionClass: "toast-top-left" });
    this.toast.error("Mesajımız", "Başlık");
    this.toast.warning("Mesajımız", "Başlık");
    this.toast.info("Mesajımız", "Başlık");
  }
}
