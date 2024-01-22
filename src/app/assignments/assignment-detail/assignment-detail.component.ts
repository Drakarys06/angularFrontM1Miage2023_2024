import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id']; // fix: declare id first
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });

  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean  {
    console.log(this.authService.isAdmin2());
    return this.authService.isAdmin2();
  }
}
