import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-editassignment',
  templateUrl: './editassignment.component.html',
  styleUrls: ['./editassignment.component.css']
})
export class EditassignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAssignment();

    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id']; // fix: declare id first

    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      if (!assignment) {
        return;
      }
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) {
      return;
    }
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;

    this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }


}
