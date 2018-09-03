import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Employer } from './employer';
import { EMPLOYEES } from './mock-employees';
import { EMPLOYER } from './mock-employer';
import { Observable, of } from 'rxjs';
import { Web3Service } from './web3.service';


@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private web3Service: Web3Service) { }

  getWeb3(): Observable<any> {
    return of(this.web3Service.getWeb3)
  }

  getEmployee(): Observable<Employee> {
      return of(EMPLOYEES[0])
  }

  getEmployees(): Observable<Employee[]> {
      return of(EMPLOYEES)
  }

  getEmployer(): Observable<Employer> {
      return of(EMPLOYER)
  }
  
}
