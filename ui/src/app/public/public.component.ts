import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { Employee } from '../employee';
import { Employer } from '../employer';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
    this.getEmployee()
    this.getEmployer()

    this.runway = this.employer.runway
    this.enoughFunds = this.runway >= 1 ? true : false
    this.isEmployee = this.employee.employerAddress === this.employer.address ? true : false
  }

  employee: Employee
  employer: Employer
  runway: number
  enoughFunds: boolean
  isEmployee: boolean

  getEmployee(): void {
    this.employee = this.payrollService.getEmployee()
  }

  getEmployer(): void {
    this.employer = this.payrollService.getEmployer()
  }

}
