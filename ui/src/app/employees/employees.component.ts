import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { Employee } from '../employee';
import { Employer } from '../employer';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
      this.employee = this.payrollService.getEmployee()
      this.isEmployee = true
  }

  employee: Employee
  isEmployee: boolean

  getEmployee(): void {
      this.employee = this.payrollService.getEmployee()
  }

}
