import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[] = [];
  loggedIn: boolean;
  url = 'https://angular-back-m1miage2023-2024.onrender.com/api/assignments';

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  
  getAssignments(): Observable <Assignment[]> {
    //return of (this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }


  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    let deleteUrl = this.url + "/" + assignment._id;
    return this.http.delete<Assignment>(deleteUrl);
  }
}
