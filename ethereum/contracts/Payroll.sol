pragma solidity ^0.4.18;

contract Payroll {

    struct EmployeeInfo {
        uint salary;
        uint lastPayday;
        uint employeePoolIndex;
    }

    uint constant payDuration = 10 seconds;
    uint totalSalary;
    address public owner;
    address[] private employeePool;
    mapping (address => EmployeeInfo) private employee;
    address public burnAddress = 0x000000000000000000000000000000000000dEaD;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function getEmployeeAddress(uint index) public view restricted returns (address) {
        require(index < employeePool.length);
        return employeePool[index];
    }

    function _calculatePayment(EmployeeInfo e) private view returns (uint) {
        return e.salary * (now - e.lastPayday) / payDuration;
    }

    function addFund() public payable {}
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function calculateRunway() public view returns (uint) {
        if (employeePool.length > 0) {
            return address(this).balance / totalSalary;
        } else {
            return address(this).balance;
        }
    }

    function hasEnoughFund() public view returns (bool) {
        if (employeePool.length > 0) {
            return calculateRunway() >= 1;
        } else {
            return address(this).balance >= 1;
        }
    }

    function isEmployee(address e) private view returns (bool success) {
        return employeePool.length == 0 ? false : employeePool[employee[e].employeePoolIndex] == e;
    }

    function isEmployee() public view returns (bool success) {
        return employeePool.length == 0 ? false : employeePool[employee[msg.sender].employeePoolIndex] == msg.sender;
    }

    function createEmployee(address e, uint s) public restricted {
        require(!isEmployee(e) && e != 0x0);

        employee[e].salary = s * 1 ether;
        employee[e].lastPayday = now;
        employee[e].employeePoolIndex = employeePool.push(e) - 1;
        totalSalary += s * 1 ether;
    }
    
    function employeePoolCount() public view returns (uint count) {
        return employeePool.length - 1;
    }

    function getEmployee(address e) public view restricted returns (uint salary, uint payDay, uint index) {
        require(isEmployee(e));

        return (
            employee[e].salary,
            employee[e].lastPayday,
            employee[e].employeePoolIndex
        );
    }

    function getEmploymentInfo() public view returns (uint salary, uint payDay) {
        require(isEmployee(msg.sender));

        return (
            employee[msg.sender].salary,
            employee[msg.sender].lastPayday
        );
    }

    function updateEmployeeSalary(address e, uint s) public restricted {
        require(isEmployee(e));

        uint payment = _calculatePayment(employee[e]);

        employee[e].lastPayday = now;
        totalSalary = totalSalary - employee[e].salary + s * 1 ether;
        employee[e].salary = s * 1 ether;

        e.transfer(payment);
    }

    function updateEmployeeAddress(address oldAddress, address newAddress) public restricted {
        require(isEmployee(oldAddress));

        uint positionToReplace = employee[oldAddress].employeePoolIndex;
        uint payment = _calculatePayment(employee[oldAddress]);

        employee[newAddress].salary = employee[oldAddress].salary;
        employee[newAddress].lastPayday = now;
        employee[newAddress].employeePoolIndex = positionToReplace;
        employeePool[positionToReplace] = newAddress;
        delete employee[oldAddress];

        newAddress.transfer(payment);
    }

    function deleteEmployee(address e) public restricted {
        require(isEmployee(e));

        uint positoinToDelete = employee[e].employeePoolIndex;
        address addressToMove = employeePool[employeePool.length - 1];

        uint payment = _calculatePayment(employee[e]);
        employee[e].lastPayday = now;
        totalSalary -= employee[e].salary;

        employeePool[positoinToDelete] = addressToMove;
        employee[addressToMove].employeePoolIndex = positoinToDelete;
        employeePool.length --;

        e.transfer(payment);
    }

    function deleteEmployeeAndBurnPayment(address e) public restricted {
        require(isEmployee(e));

        uint positoinToDelete = employee[e].employeePoolIndex;
        address addressToMove = employeePool[employeePool.length - 1];

        uint payment = _calculatePayment(employee[e]);
        employee[e].lastPayday = now;
        totalSalary -= employee[e].salary;

        employeePool[positoinToDelete] = addressToMove;
        employee[addressToMove].employeePoolIndex = positoinToDelete;
        employeePool.length --;

        burnAddress.transfer(payment);
    }

    function getPaid() public {
        address sender = msg.sender;
        require(isEmployee(sender));

        uint nextPayday = employee[sender].lastPayday + payDuration;
        assert(nextPayday < now);

        employee[sender].lastPayday = nextPayday;
        sender.transfer(employee[sender].salary);
    }
    
    function () public payable {}
}