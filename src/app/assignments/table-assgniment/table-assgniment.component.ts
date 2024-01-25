import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-assgniment',
  templateUrl: './table-assgniment.component.html',
  styleUrls: ['./table-assgniment.component.css']
})
export class TableAssgnimentComponent implements OnInit{
  dataSource: MatTableDataSource<Assignment>;
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['nom','dateDeRendu','matiere','rendu','note'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  constructor(public dialog: MatDialog, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.assignmentsService.getAssignmentsPagine(1,5).subscribe((data: Assignment[]) => {
      this.assignments = data;
      this.dataSource = new MatTableDataSource(this.assignments);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDetails(assignment: Assignment) {
    this.router.navigate(['/assignment-details', assignment.id]);
  }

  isLog(): boolean  {
    console.log(this.authService.isLog2());
    return this.authService.isLog2();
  }

  /*ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }*/

  /*openDetails(assignment: Assignment) {
    this.dialog.open(AssignmentDetailsDialog, {
      data: assignment
    });
  }*/
}

