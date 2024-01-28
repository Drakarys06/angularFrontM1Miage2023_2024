import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../assignments/users.model';
import { Unary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  url = 'https://angular-back-m1miage2023-2024.onrender.com/api/utilisateurs';

  constructor(private http:HttpClient) { }

  log(assignmentName, action){
    console.log("Assignment " + assignmentName + " " + action);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getUser(login: String): Observable<any> {
    return this.http.get<any>(this.url + "/" + login);
  }

  login(username: string, password: string, role: String): Observable<boolean> {
    const loginData = { username, password, role };

    return this.http.post<boolean>(`${this.url}/login`, loginData)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur de connexion :', error);
    return new Observable<never>();
  }
}