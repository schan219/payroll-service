import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employee: Employee = {
    address: 11111,
    lastPayDay: new Date(1301090400 * 1000),
    salary: 1,
    employeePoolIndex: 1,
    employerAddress: 22222
  };

  isEmployee = true

  constructor() { }

  ngOnInit() {
  }

}
