import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from './shared/auth.guard';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditassignmentComponent } from './assignments/editassignment/editassignment.component';
import { LogginComponent } from './assignments/loggin/loggin.component';

const routes: Routes = [
    { path: '', component: AssignmentsComponent},
    { path: 'home', component: AssignmentsComponent },
    { path: 'add', component: AddAssignmentComponent },
    { path: 'assignment/:id', component: AssignmentDetailComponent },
    { path: 'assignment/:id/edit', component: EditassignmentComponent},
    { path: 'loggin', component: LogginComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
