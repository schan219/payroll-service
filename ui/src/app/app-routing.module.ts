import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { EmployerComponent } from './employer/employer.component';
import { PublicComponent } from './public/public.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'employee', component: EmployeesComponent },
  { path: 'employer', component: EmployerComponent },
  { path: '', component: PublicComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
