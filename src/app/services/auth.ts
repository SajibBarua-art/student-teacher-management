import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private baseUrl = 'http://localhost:3000/teachers';

  constructor(private router: Router, private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) this._isLoggedIn$.next(true);
  }

  login(email: string, password: string): void {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (teachers) => {
        const matchedTeacher = teachers.find(t => t.email === email && t.password === password);
        if (matchedTeacher) {
          console.log('Login Successful!');
          localStorage.setItem('currentUser', JSON.stringify(matchedTeacher));
          this._isLoggedIn$.next(true);
          this.router.navigate(['/home']);
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
