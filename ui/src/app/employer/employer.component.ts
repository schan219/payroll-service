import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { Employee } from '../employee';
import { Employer } from '../employer';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
    this.getEmployees()
    this.getEmployer()

    this.contractAddress = this.employer.address
    this.payrollInitialized = this.employer.address ? true : false

    this.funds = this.employer.funds
  }

  employees: Employee[]
  employer: Employer
  contractAddress: number
  payrollInitialized: boolean
  funds: number

  getEmployees(): void {
    this.employees = this.payrollService.getEmployees()
  }

  getEmployer(): void {
    this.employer = this.payrollService.getEmployer()
  }

}
