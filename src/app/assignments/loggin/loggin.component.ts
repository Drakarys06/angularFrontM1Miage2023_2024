import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLogFailed = false;
  getErrorLoggin = 'Nom d\'utilisateur ou mot de passe incorrect.';

  ngOnInit(): void {

  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const isLoggedIn = this.authService.logIn(username || '', password || '');
      if (isLoggedIn !== undefined && isLoggedIn !== null) {
        this.router.navigate(['/home']);
      } else {
        this.isLogFailed = true;
      }
    }
  }

  get getUsername() { return this.loginForm.get('username'); }
  get getPassword() { return this.loginForm.get('password'); }
}
