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

  employees: Employee[]
  employer: Employer
  contractAddress: string
  payrollInitialized: boolean
  funds: number
  fundField: number

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
    this.initializeWeb3().then((results) => {
      this.getEmployees()
      this.getEmployer()
      this.getContractAddress()

      this.contractAddress = this.employer.address
      this.payrollInitialized = this.employer.address ? true : false

      this.funds = this.employer.funds
    }).catch((e) => {
      console.log(e)
    })
  }

  initializeWeb3() {
    return new Promise(async (resolve) => {
      var results = await this.payrollService.initializeWeb3()
      resolve(results)
    })
  }

  getContractAddress(): void {
    this.contractAddress = this.payrollService.getContractAddress()
  }

  getEmployees(): void {
    this.payrollService.getMockEmployees().subscribe(employees => this.employees = employees)
  }

  getEmployer(): void {
    this.payrollService.getMockEmployer().subscribe(employer => this.employer = employer)
  }

  addFunds(): void {
    this.payrollService.addFund(this.fundField)
  }

}
