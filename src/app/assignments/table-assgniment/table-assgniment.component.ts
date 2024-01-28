import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class TableAssgnimentComponent implements OnInit {
  dataSource: MatTableDataSource<Assignment>;
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['nom', 'remarques', 'dateDeRendu', 'matiere', 'rendu', 'note'];
  page: number = 1;
  pageSize: number = 5;
  totalDocs: number = 0;
  hasPrevPage: boolean = false;
  hasNextPage: boolean = false;
  totalPages: number = 0;
  nextPage: number = 0;
  prevPage: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.pageSize).subscribe({
      next: ({ docs, totalDocs }) => {
        this.assignments = docs;
        this.hasPrevPage = this.hasPrevPage;
        this.hasNextPage = this.hasNextPage;
        this.totalPages = this.totalPages;
        this.nextPage = this.nextPage;
        this.prevPage = this.prevPage;
        this.totalDocs = totalDocs;
        this.dataSource = new MatTableDataSource(this.assignments);
        this.paginator.length = this.totalDocs;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error('Error fetching assignments:', error),
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.paginator.length = this.totalDocs;
    this.loadAssignments();
  }

  openDetails(assignment: Assignment) {
    console.log("openDetails");
    this.router.navigate(['/assignment', assignment.id]);
  }

  isLog(): boolean {
    console.log(this.authService.isLog2());
    return this.authService.isLog2();
  }

  ngAfterViewInit() {
    this.loadAssignments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trimEnd().toLowerCase();
  }

}

