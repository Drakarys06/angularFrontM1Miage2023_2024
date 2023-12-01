import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  color = 'green';
  boutonDesactive = true;

  //Pour formulaire visible
  formVisible = false;
  //Pour liste visible

  assignementSelectionne!: Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.assignments = this.assignmentsService.getAssignments();
    this.getAssignments();
  }
  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  assignmentClique(a: Assignment) {
    this.assignementSelectionne = a;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  onAddAssignement(event: any) {
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event).subscribe((message) => {
      console.log(message);
    });
    this.formVisible = false;
  }

  getAssignments() {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });
  }

  isLogged():boolean {
    return this.authService.isLog2();
  }

  isAdmin(): boolean  {
    console.log(this.authService.isAdmin2());
    return this.authService.isAdmin2();
  }

  
}
