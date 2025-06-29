import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {Auth} from '../../services/auth';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: Auth) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout() {
    this.authService.logout();
  }
}
