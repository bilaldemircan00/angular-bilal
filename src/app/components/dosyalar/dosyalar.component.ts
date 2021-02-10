import { StServisService } from './../../services/stServis.service';
import { Dosya } from './../../models/dosya';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dosyalar',
  templateUrl: './dosyalar.component.html',
  styleUrls: ['./dosyalar.component.scss']
})
export class DosyalarComponent implements OnInit {
  dosyalar: Dosya[];
  files: FileList;
  constructor(
    public stServis: StServisService
  ) { }

  ngOnInit() {
    this.DosyaListele();
  }
  DosyaListele() {
    this.stServis.DosyaListele().snapshotChanges().subscribe(data => {
      this.dosyalar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.dosyalar.push(y as Dosya);
      });
    });
  }
  DosyaSec(e) {
    this.files = e.target.files;
  }
  DosyaYukle() {
    var dosya = new Dosya();
    dosya.file = this.files[0];
    this.stServis.DosyaYukleStorage(dosya).subscribe(
      p => {
        console.log("Yüklendi");
      }, err => {
        console.log("Hata");
      }
    );
  }
  DosyaSil(dosya: Dosya) {
    this.stServis.DosyaSil(dosya);
  }
}
