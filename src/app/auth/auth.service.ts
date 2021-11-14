import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fsAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isAuth();
   }

  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject(null);


  registerUser(email: string, password: string){
    this.fsAuth.createUserWithEmailAndPassword(email, password).then(_ => {
      this.onAuthSuccess();
    })
  }

  login(email: string, password: string): void{
    this.fsAuth.signInWithEmailAndPassword(email, password).then(_ => {
      this.onAuthSuccess();
    })
  }

  isAuth(): void{
    this.fsAuth.authState.subscribe(res => res ? this.isAuthenticated.next(true) : this.isAuthenticated.next(false));
  }

  onAuthSuccess(): void{
    console.log('hyri')
    this.router.navigate(['training']);
  }

}
