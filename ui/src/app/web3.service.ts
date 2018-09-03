import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor() { }

  getWeb3 = new Promise(function(resolve, reject) {
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

  isLoggedIn(web3: object) {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()
    
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

  addFund() {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()

        var success = await web3.methods.addFund().send({
          from: accounts[0]
        })

        resolve(success)
      } catch (e) {

        console.log('Cannot add funds.');

        reject(e)
      }
    })
  }

  getEmployee(address: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']

        var employee = await web3.methods.getEmployee(address).call()

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
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()

        var success = await web3.methods.createEmployee(address, salary).send({
          from: accounts[0]
        })

        resolve(success)
      } catch (e) {

        console.log('Cannot create employee.');

        reject(e)
      }
    })
  }

  deleteEmployee(address: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()

        var success = await web3.methods.deleteEmployee(address).send({
          from: accounts[0]
        })

        resolve(success)
      } catch (e) {

        console.log('Cannot delete employee.');

        reject(e)
      }
    })
  }

  updateEmployeeAddress(oldAddress: number, newAddress: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()

        var success = await web3.methods.updateEmployeeAddress(oldAddress, newAddress).send({
          from: accounts[0]
        })

        resolve(success)
      } catch (e) {

        console.log('Cannot update employee address.');

        reject(e)
      }
    })
  }

  updateEmployeeSalary(address: number, salary: number) {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts()

        var success = await web3.methods.updateEmployeeSalary(address, salary).send({
          from: accounts[0]
        })

        resolve(success)
      } catch (e) {

        console.log('Cannot update employee salary.');

        reject(e)
      }
    })
  }

  getPaid() {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']
        var accounts = await web3.eth.getAccounts();

        var paid = await web3.methods.getPaid().send({
          from: accounts[0]
        })

        resolve(paid)
      } catch (e) {

        console.log('Cannot get paid.');

        reject(e)
      }
    })
  }

  calculateRunway() {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']

        var runway = await web3.methods.calculateRunway().call()

        resolve(runway)
      } catch (e) {

        console.log('Cannot calculate runway.');

        reject(e)
      }
    })
  }

  hasEnoughFund() {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']

        var enoughFund = await web3.methods.hasEnoughFund().call()

        resolve(enoughFund)
      } catch (e) {

        console.log('Cannot check for funds.');

        reject(e)
      }
    })
  }

  isEmployee() {
    return new Promise(async (resolve, reject) => {
      try {
        var results = await this.getWeb3
        var web3 = results['web3']

        var isEmployee = await web3.methods.isEmployee().call()

        resolve(isEmployee)
      } catch (e) {

        console.log('Cannot check for employee status.');

        reject(e)
      }
    })
  }
}
