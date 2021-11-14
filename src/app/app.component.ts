import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav

  title = 'trainning-app';

  ngOnInit(): void{
  }

  onToggleSidenav(): void{
    this.sidenav.toggle();
  }
}
