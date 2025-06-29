import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private router: Router) { }

  login() {
    console.log("Login Successful!");
    this._isLoggedIn$.next(true);
    this.router.navigate(['/home']);
  }

  logout() {
    console.log("User Logged out.");
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
}
