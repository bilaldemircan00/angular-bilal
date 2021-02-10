import { KayitekleComponent } from './../kayitekle/kayitekle.component';
import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Yorum } from 'src/app/models/yorum';


@Component({
  selector: 'app-kayitdetay',
  templateUrl: './kayitdetay.component.html',
  styleUrls: ['./kayitdetay.component.css']
})
export class KayitdetayComponent implements OnInit {
  key: string;
  secKayit: Kayit = new Kayit();
  secYorum: Yorum = new Yorum();
  adsoyad: string;
  uid: string;
  yorumlar: Yorum[];
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
    });

    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.YorumListele();
  }
  KayitGetir() {
    this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secKayit = (y as Kayit);
    });
  }
  YorumListele() {
    this.fbServis.YorumListeleUID(this.key).snapshotChanges().subscribe(data => {
      this.yorumlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.yorumlar.push(y as Yorum);
      });
    });
  }
  YorumYap() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secYorum.uid = user.uid;
    this.secYorum.icerikid = this.key;
    this.secYorum.user = user.displayName;
    var tarih = new Date();
    this.secYorum.kayTarih = tarih.getTime().toString();
    this.fbServis.YorumEkle(this.secYorum).then(d => {
      this.router.navigate(['/kayitlar' + this.key]);
    });
  }
  YorumSil(yorumkey) {
    this.fbServis.YorumSil(yorumkey).then(d => {
      this.router.navigate(['/kayitdetay']);
    });
  }

  Like() {
    var like = this.secKayit.like;
    this.secKayit.like = like + 1; 
    this.fbServis.KayitDuzenle(this.secKayit).then(d => {
      this.router.navigate(['/kayitdetay']);
    });
  }
  DisLike() {
    var dislike = this.secKayit.dislike;
    this.secKayit.dislike = dislike + 1; 
    this.fbServis.KayitDuzenle(this.secKayit).then(d => {
      this.router.navigate(['/kayitdetay']);
    });
  }
}
