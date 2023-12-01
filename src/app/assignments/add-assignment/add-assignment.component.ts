import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  //@Output() assignmentAdded = new EventEmitter<Assignment>();

  nomDevoir: string = ""
  dateDeRendu?: Date;
  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    let a = new Assignment();
    a.id = Math.floor(Math.random()*1000);
    a.nom = this.nomDevoir;
    if (this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;

    //this.assignmentAdded.emit(a);
    this.assignmentsService.addAssignment(a).subscribe(message => {
      console.log(message);
    });
  }


}
