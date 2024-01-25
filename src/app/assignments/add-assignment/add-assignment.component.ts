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
  auteur: string = "";
  matiere: string = "";
  remarques: string = "Devoir à rendre noté sur 20";
  rendu: boolean = false;
  matieres: string[] = ['Base de données', 'Programmation Web', 'Programmation Mobile', 'Programmation Orientée Objet', 'Réseaux', 'Systèmes d\'exploitation', 'Anglais', 'Mathématiques', 'Projet', 'Stage']

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 5000);
    newAssignment.nom = this.nomDevoir;
    if (this.dateDeRendu)
      newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.matiere = this.matiere;
    newAssignment.auteur = this.auteur;
    newAssignment.note = Math.floor(Math.random() * 20);
    newAssignment.remarques = this.remarques;

    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
    });
  }


}
