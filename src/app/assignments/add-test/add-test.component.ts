import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';



@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  //@Output() assignmentAdded = new EventEmitter<Assignment>();

  nomDevoir: string = ""
  dateDeRendu?: Date;
  auteur: string = "";
  matiere: string = "";
  remarques: string = "Devoir à rendre noté sur 20";
  rendu: boolean = false;
  matieres: string[] = ['Base de données', 'Programmation Web', 'Programmation Mobile', 'Programmation Orientée Objet', 'Réseaux', 'Systèmes d\'exploitation', 'Anglais', 'Mathématiques', 'Projet', 'Stage']
  nbrDevoirs: number;

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    this.nbrDevoirs = this.nbrDevoirs;
    for (let i = 0; i < this.nbrDevoirs; i++) {
      let newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random() * 10000);
      newAssignment.nom = this.nomDevoir;
      if (this.dateDeRendu)
        newAssignment.dateDeRendu = this.dateDeRendu;
      newAssignment.rendu = false;
      newAssignment.matiere = this.matiere;
      //newAssignment.auteur = this.authServ.login;
      newAssignment.note = Math.floor(Math.random() * 20);
      newAssignment.remarques = this.remarques;

      this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
        console.log(message);
      });
    }

  }

  isAdmin(): boolean  {
    console.log(this.authService.isAdmin2());
    return this.authService.isAdmin2();
  }
}
