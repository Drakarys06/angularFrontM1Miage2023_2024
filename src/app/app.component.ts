import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  onLogout() {
    throw new Error('Method not implemented.');
  }
  onLoggout() {
    throw new Error('Method not implemented.');
  }
  onLoggin() {
    throw new Error('Method not implemented.');
  }
  titre = 'Application de gestion de devoirs (Assignments)';
  openSidenav = false;

  constructor(public authService: AuthService, private router: Router) { }

  login() {
    if (!this.authService.loggedIn) {
      //this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  onLogginForm() {
    this.router.navigate(['/loggin']);
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
