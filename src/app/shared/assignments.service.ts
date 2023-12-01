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
  url = 'https://angular-back-m1miage2023-2024.onrender.com/assignments';

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  
  getAssignments(): Observable <Assignment[]> {
    //return of (this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }


  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    /*this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, "ajouté");
    return of(assignment);*/
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    return of("Assignment mis à jour");
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);
    return of("Assignment supprimé");
  }
}
