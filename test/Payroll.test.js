const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledPayroll = require('../ethereum/build/contracts/Payroll.json');

var accounts;
var payroll;
var payrollAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    payroll = await new web3.eth.Contract(JSON.parse(compiledPayroll.interface))
        .deploy({ data: compiledPayroll.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Payroll Contract', () => {
    it('deploys a contract', () => {
        assert.ok(payroll.options.address);
    });
});

describe('Employers', () => {
    it('should be able to add funds', async () => {
        await payroll.methods.addFund().send({
            from: accounts[0],
            value: web3.utils.toWei('0.01', 'ether')
        });

        assert.equal(await web3.eth.getBalance(payroll.options.address), web3.utils.toWei('0.01', 'ether'));
    });

    it('should be able to create and get employees', async () => {
        // create
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        // get
        const employee = await payroll.methods.getEmployee(accounts[0]).call();
        assert.equal(web3.utils.toWei('1', 'ether'), employee.salary);
        assert.equal(0, employee.index);
        assert.equal(true, employee.payDay < Date.now());
    });

    it('should be able to update employee address', async () => {
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await payroll.methods.updateEmployeeAddress(accounts[0], accounts[1]).send({
                from: accounts[0],
                gas: '1000000'
            });
    });

    it('should be able to update employee salary', async () => {
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        const employee = await payroll.methods.getEmployee(accounts[0]).call();
        assert.equal(web3.utils.toWei('1', 'ether'), employee.salary);

        await payroll.methods.updateEmployeeSalary(accounts[0], 2)
            .send({
                    from: accounts[0],
                    gas: '1000000'
                });

        const updatedEmployee = await payroll.methods.getEmployee(accounts[0]).call();
        assert.equal(web3.utils.toWei('2', 'ether'), updatedEmployee.salary);
    });
});

describe('Employees', () => {
    it('should be able to get paid', async () => {
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        const getPaid = async function () {
            try {
                await payroll.methods.getPaid().send({
                    from: accounts[0],
                    gas: '1000000'
                });
            } catch (e) {
                assert.fail('Error: Cannot get paid');
            }
        };

        setTimeout(getPaid, 11 * 1000);

    });
});

describe('Anyone', () => {
    it('should be able to calculate runway', async () => {
        await payroll.methods.createEmployee(accounts[0], 2)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await payroll.methods.addFund().send({
            from: accounts[0],
            value: web3.utils.toWei('6', 'ether')
        });

        const runway = await payroll.methods.calculateRunway().call();
        assert.equal(3, runway);
    });

    it('should be able to check for sufficient funds', async () => {
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await payroll.methods.addFund().send({
            from: accounts[0],
            value: web3.utils.toWei('0.01', 'ether')
        });

        const bool = await payroll.methods.hasEnoughFund().call();
        assert.equal(false, bool);

        await payroll.methods.addFund().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether')
        });

        const updatedBool = await payroll.methods.hasEnoughFund().call();
        assert.equal(true, updatedBool);
    });

    it('should be able to check if they are an employee', async () => {
        await payroll.methods.createEmployee(accounts[0], 1)
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        const bool = await payroll.methods.isEmployee(accounts[0]).call();
        assert.equal(true, bool);
        const boolFalse = await payroll.methods.isEmployee(accounts[1]).call();
        assert.equal(false, boolFalse);
    });
});
