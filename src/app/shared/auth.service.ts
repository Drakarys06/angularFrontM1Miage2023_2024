import { Injectable } from '@angular/core';
import { Users } from '../assignments/users.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = false;

  getUsers: Users | null = null;

  users: Users[] = [
    { login: 'admin', password: 'admin', role: 'admin' },
    { login: 'user1', password: 'user1', role: 'user' },
    { login: 'user2', password: 'user2', role: 'user' }
  ];
  isAuth: any;

  logIn(login: string, password: string): boolean {
    const user = this.users.find(u => u.login === login && u.password === password)
    if (user) {
      this.getUsers = user;
      this.loggedIn = true;
      if (user.role === 'admin') {
        this.isAdmin();
      }
      return this.loggedIn;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
  }

  isLog(): Promise<boolean> {
    return Promise.resolve(this.loggedIn);
  }

  isLog2(): boolean {
    return this.loggedIn;
  }

  isAdmin(): Promise<boolean> {
    return Promise.resolve(this.getUsers?.role === 'admin');
  }

  isAdmin2(): boolean {
    return this.getUsers?.role === 'admin';
  }

}