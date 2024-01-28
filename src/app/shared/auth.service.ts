import { Injectable } from '@angular/core';
import { Users } from '../assignments/users.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedInUser: string;
  loggedIn = false;

  getUser;
  getUsers: Users[];
  isAuth: any;


  logIn(role: string): boolean {
    this.loggedIn = true;
    console.log('role : ' + role);
    if (role === 'admin') {
      console.log(this.getUser);
      this.isAdmin();
    }
    return this.loggedIn;
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
    return Promise.resolve(this.getUser?.role === 'admin');
  }

  isAdmin2(): boolean {
    return this.getUser?.user === 'admin';
  }

}