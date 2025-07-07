import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Auth} from './services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn$;
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

