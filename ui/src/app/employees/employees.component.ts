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

  employee: Employee
  isEmployee: boolean = false

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
    this.initializeWeb3().then((results) => {
      this.getEmploymentInfo()
      if (this.employee) {
        this.isEmployee = true
      }
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

  async getEmploymentInfo() {
    //this.payrollService.getMockEmployee().subscribe(employee => this.employee = employee)
    this.employee = await this.payrollService.getEmploymentInfo() as Employee
  }

}
