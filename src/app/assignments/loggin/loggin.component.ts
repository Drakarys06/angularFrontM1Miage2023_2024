import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LoggingService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  constructor(private loggingService: LoggingService, private router: Router, private authService: AuthService) { }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('user' || 'admin', Validators.required) // Défaut: role 'user' ou 'admin'
  });

  isLogFailed = false;
  getErrorLoggin = 'Nom d\'utilisateur, mot de passe ou rôle incorrect.';

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loggingService.getUsers().subscribe(
      users => {
        console.log(users)
        this.authService.getUsers = users;
        for (let user of users) {
          if (user.login === this.getUsername.value &&
            user.pwd === this.getPassword.value) {
            console.log('Les informations du formulaire correspondent à un utilisateur.');
            this.authService.getUser = user;
            console.log('Utilisateur connecté :', this.authService.getUser);
            this.isLogFailed = false;
            this.authService.logIn(user.user);
            this.router.navigate(['/home']);
            break;
          }
        }
        console.log('Aucun utilisateur ne correspond aux informations du formulaire.');
      },
      error => {
        console.error('Erreur lors de la connexion :', error);
        this.isLogFailed = true;
      }
    );
  }

  get getUsername() { return this.loginForm.get('login'); }
  get getPassword() { return this.loginForm.get('password'); }
  get getRole() { return this.loginForm.get('role'); }
}
