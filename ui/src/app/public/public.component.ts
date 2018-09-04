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

  employerAddress: string
  runway: any
  enoughFunds: boolean

  constructor(private payrollService: PayrollService) { }

  ngOnInit() {
    this.initializeWeb3().then((results) => {
      this.getContractAddress()
      this.calculateRunway()
      this.enoughFunds = this.runway >= 1 ? true : false
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
    this.employerAddress = this.payrollService.getContractAddress()
  }

  async calculateRunway() {
    this.runway = await this.payrollService.calculateRunway()
  }

}
