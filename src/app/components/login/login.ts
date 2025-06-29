import { Component } from '@angular/core';
import {Auth} from '../../services/auth';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css', '../navbar/navbar.css']
})
export class Login {
  constructor(private authService: Auth) { }

  onLogin() {
    this.authService.login();
  }
}
