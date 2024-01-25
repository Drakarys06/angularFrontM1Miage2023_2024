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

  //Gérer la pagination
  page: number = 1;
  limit: number = 5;
  totalDocs!: number;
  totalPages!: number;
  NextPage!: number;
  PrevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.assignments = this.assignmentsService.getAssignments();
    //this.getAssignments();
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).
      subscribe(data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.NextPage = data.nextPage;
        this.PrevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log(data);
      });
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
