import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Employer } from './employer';
import { EMPLOYEES } from './mock-employees';
import { EMPLOYER } from './mock-employer';


@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor() { }

  getEmployee(): Employee {
      return EMPLOYEES[0]
  }

  getEmployees(): Employee[] {
      return EMPLOYEES
  }

  getEmployer(): Employer {
      return EMPLOYER
  }
}
