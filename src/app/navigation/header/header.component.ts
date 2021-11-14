import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter()
  isAuth: boolean = false;
  destroy$: Subject<any> = new Subject()
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.pipe(takeUntil(this.destroy$)).subscribe(res => this.isAuth = res);
  }

  onSidenavToggle(): void{
    this.toggleSidenav.emit();
    console.log('hyir')
  }

}
