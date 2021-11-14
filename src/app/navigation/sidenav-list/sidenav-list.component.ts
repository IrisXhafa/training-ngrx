import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose: EventEmitter<boolean> = new EventEmitter();
  isAuth: boolean = false;
  destroy$: Subject<any> = new Subject()
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.pipe(takeUntil(this.destroy$)).subscribe(res => this.isAuth = res);
  }

  closeSidenav(): void{
    this.sidenavClose.emit()
  }
  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
