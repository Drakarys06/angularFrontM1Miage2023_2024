import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  //@Output() assignmentAdded = new EventEmitter<Assignment>();

  nomDevoir: string = ""
  dateDeRendu?: Date;
  auteur: string = "";
  matiere: string = "";
  note: number = 0;
  remarques: string = "";
  rendu: boolean = false;
  matieres: string[] = ['Base de données', 'Programmation Web', 'Programmation Mobile', 'Programmation Orientée Objet', 'Réseaux', 'Systèmes d\'exploitation', 'Anglais', 'Mathématiques', 'Projet', 'Stage']
  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.remarques = this.remarques;
    newAssignment.rendu = this.rendu;
    newAssignment.note = this.note;

    if (this.dateDeRendu)
      newAssignment.dateDeRendu = this.dateDeRendu;

    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
    });
  }


}
