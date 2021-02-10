import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uyg01';
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

  }
  
}
