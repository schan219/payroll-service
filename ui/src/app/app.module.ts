import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployerComponent } from './employer/employer.component';
import { PublicComponent } from './public/public.component';
import { AppRoutingModule } from './app-routing.module';
import { PayrollService } from './payroll.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployerComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PayrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
