import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Employer } from './employer';
import { EMPLOYEES } from './mock-employees';
import { EMPLOYER } from './mock-employer';
import { Observable, of } from 'rxjs';
import Web3 from 'web3';

declare let require: any;
let Payroll = require('./../../../ethereum/build-frontend/Payroll.json');


@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private _web3: any
  private _payroll: any
  private _contractAddress = '0x42f4eded60e9eff5537dc31ebdf3f04906ab8f78'

  constructor() {
    this.initializeWeb3().then((results) => {
      this._web3 = results['web3']
      this._payroll = new this._web3.eth.Contract(
        JSON.parse(Payroll.interface),
        this._contractAddress
        )
    })
  }

  getContractAddress(): string {
    return this._contractAddress;
  }

  initializeWeb3(): Promise<Object> { 
    return new Promise(function(resolve, reject) {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener('load', function() {
        var results
        var web3 = window['web3']

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider.
          web3 = new Web3(web3.currentProvider)

          results = {
            web3: web3
          }

          console.log('Injected web3 detected.');

          resolve(results)
        } else {
          // Fallback to localhost if no web3 injection.
          var provider = new Web3.providers.HttpProvider('http://localhost:8545')

          web3 = new Web3(provider)

          results = {
            web3: web3
          }

          console.log('No web3 instance injected, using Local web3.');

          resolve(results)
        }
      })
    })
  }

  getMockEmployee(): Observable<Employee> {
      return of(EMPLOYEES[0])
  }

  getMockEmployees(): Observable<Employee[]> {
      return of(EMPLOYEES)
  }

  getMockEmployer(): Observable<Employer> {
      return of(EMPLOYER)
  }

  addFund(fundField: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()

        await this._web3.methods.addFund().send({
          from: accounts[0],
          value: fundField
        })

        resolve()
      } catch (e) {

        console.log('Cannot add funds.');

        reject(e)
      }
    })
  }

  isLoggedIn(web3: object) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()
    
        if (accounts.length > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  getEmploymentInfo(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      try {    
        let employee = await this._payroll.methods.getEmployee().call()

        resolve(employee)
      } catch (e) {

        console.log('Cannot get employee.');

        reject(e)
      }
    })
  }

  createEmployee(address: number, salary: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()

        await this._payroll.methods.createEmployee(address, salary).send({
          from: accounts[0]
        })

        resolve()
      } catch (e) {

        console.log('Cannot create employee.');

        reject(e)
      }
    })
  }

  deleteEmployee(address: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()

        await this._payroll.methods.deleteEmployee(address).send({
          from: accounts[0]
        })

        resolve()
      } catch (e) {

        console.log('Cannot delete employee.');

        reject(e)
      }
    })
  }

  updateEmployeeAddress(oldAddress: number, newAddress: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()

        await this._payroll.methods.updateEmployeeAddress(oldAddress, newAddress).send({
          from: accounts[0]
        })

        resolve()
      } catch (e) {

        console.log('Cannot update employee address.');

        reject(e)
      }
    })
  }

  updateEmployeeSalary(address: number, salary: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts()

        await this._web3.methods.updateEmployeeSalary(address, salary).send({
          from: accounts[0]
        })

        resolve()
      } catch (e) {

        console.log('Cannot update employee salary.');

        reject(e)
      }
    })
  }

  getPaid() {
    return new Promise(async (resolve, reject) => {
      try {
        var accounts = await this._web3.eth.getAccounts();

        await this._payroll.methods.getPaid().send({
          from: accounts[0]
        })

        resolve()
      } catch (e) {

        console.log('Cannot get paid.');

        reject(e)
      }
    })
  }

  calculateRunway(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this._payroll)
        var runway = await this._payroll.methods.calculateRunway().call()

        resolve(runway)
      } catch (e) {

        console.log('Cannot calculate runway.');

        reject(e)
      }
    })
  }

  hasEnoughFund(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        var enoughFund = await this._payroll.methods.hasEnoughFund().call()

        resolve(enoughFund)
      } catch (e) {

        console.log('Cannot check for funds.');

        reject(e)
      }
    })
  }

  isEmployee(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        var isEmployee = await this._payroll.methods.isEmployee().call()

        resolve(isEmployee)
      } catch (e) {

        console.log('Cannot check for employee status.');

        reject(e)
      }
    })
  }
  
}
