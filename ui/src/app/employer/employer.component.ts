import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  contractAddress = 22222
  payrollInitialized = true

  employee1: Employee = {
    address: 11111,
    lastPayDay: new Date(1301090400 * 1000),
    salary: 1,
    employeePoolIndex: 1,
    employerAddress: 22222
  };

  employee2: Employee = {
    address: 55555,
    lastPayDay: new Date(1301090400 * 1000),
    salary: 2,
    employeePoolIndex: 2,
    employerAddress: 22222
  };

  employees: Employee[] = [this.employee1, this.employee2]
  funds = 6

}
