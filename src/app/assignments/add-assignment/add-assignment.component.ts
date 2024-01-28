import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as e from 'express';

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

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 10000);
    newAssignment.nom = this.nomDevoir;
    if (this.dateDeRendu)
      newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.matiere = this.matiere;
    newAssignment.note = Math.floor(Math.random() * 20);
    newAssignment.remarques = this.remarques;
    if (this.authService.getUser.role == 'admin') {
      for (let user of this.authService.getUsers) {
        console.log(user)
        if (user.role == 'user') {
          newAssignment.auteur = user.login;
          this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
            console.log(message);
          });
        }
      }
    } else {
      newAssignment.auteur = this.authService.getUser.login;
      this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
        console.log(message);
      });
    }
    this.router.navigate(['/home']);
  }

  isAdmin(): boolean {
    console.log(this.authService.isAdmin2());
    return this.authService.isAdmin2();
  }
}
