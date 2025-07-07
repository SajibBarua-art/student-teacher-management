import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular'; // Alias Auth0's AuthService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  public isLoggedIn$: Observable<boolean>;
  public userProfile$: Observable<any>;

  constructor(
    private router: Router,
    private auth0: Auth0Service // Inject Auth0's AuthService
  ) {
    this.isLoggedIn$ = this.auth0.isAuthenticated$;
    this.userProfile$ = this.auth0.user$;
  }

  login(): void {
    console.log('Initiating Auth0 login...');
    this.auth0.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }

  logout(): void {
    console.log('User logging out via Auth0.');
    this.auth0.logout({
      logoutParams: {
        returnTo: `${window.location.origin}/login`
      }
    });
  }
}
