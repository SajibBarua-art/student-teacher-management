import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GLOBALS} from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private baseUrl = `${GLOBALS.api}/teachers`;

  constructor(private router: Router, private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) this._isLoggedIn$.next(true);
  }

  login(email: string, password: string): void {
    console.log('hello', this.baseUrl);

    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (teachers) => {
        const matchedTeacher = teachers.find(t => t.email === email && t.password === password);

        console.log("matched teacher: ", matchedTeacher);

        if (matchedTeacher) {
          console.log('Login Successful!');
          localStorage.setItem('currentUser', JSON.stringify(matchedTeacher));
          this._isLoggedIn$.next(true);
          this.router.navigate(['/home']).then(success => {
            if (success) {
              console.log('Navigation to /home successful!');
            } else {
              console.warn('Navigation to /home failed.');
            }
          });
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('An error occurred during login');
      }
    });
  }

  logout(): void {
    console.log('User Logged out.');
    localStorage.removeItem('currentUser');
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
}
