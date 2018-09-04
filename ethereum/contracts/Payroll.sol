pragma solidity ^0.4.18;

contract Payroll {
    
    struct EmployeeInfo {
        uint salary;
        uint lastPayday;
        uint employeePoolIndex;
    }
    
    uint constant payDuration = 10 seconds;
    uint totalSalary;
    address private owner;
    address[] private employeePool;
    mapping (address => EmployeeInfo) private employee;

    constructor() public {
        owner = msg.sender;
    }

    function _calculatePayment(EmployeeInfo e) private view returns (uint) {
        return e.salary * (now - e.lastPayday) / payDuration;
    }

    function addFund() public payable {}
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function calculateRunway() public view returns (uint) {
        uint employeePoolLength = employeePool.length;
        require (employeePoolLength > 0);

        return address(this).balance / totalSalary;
    }

    function hasEnoughFund() public view returns (bool) {
        return calculateRunway() >= 1;
    }

    function isEmployee(address e) public view returns (bool success) {
        return employeePool.length == 0 ? false : employeePool[employee[e].employeePoolIndex] == e;
    }

    function createEmployee(address e, uint s) public {
        require(msg.sender == owner && !isEmployee(e) && e != 0x0);

        employee[e].salary = s * 1 ether;
        employee[e].lastPayday = now;
        employee[e].employeePoolIndex = employeePool.push(e) - 1;
        totalSalary += s * 1 ether;
    }
    
    function employeePoolCount() public view returns (uint count) {
        return employeePool.length - 1;
    }

    function getEmployee(address e) public view returns (uint salary, uint payDay, uint index) {
        require(msg.sender == owner && isEmployee(e));

        return (
            employee[e].salary,
            employee[e].lastPayday,
            employee[e].employeePoolIndex
        );
    }

    function updateEmployeeSalary(address e, uint s) public {
        require(msg.sender == owner && isEmployee(e));

        uint payment = _calculatePayment(employee[e]);

        employee[e].lastPayday = now;
        totalSalary = totalSalary - employee[e].salary + s * 1 ether;
        employee[e].salary = s * 1 ether;

        e.transfer(payment);
    }

    function updateEmployeeAddress(address oldAddress, address newAddress) public {
        require(msg.sender == owner && isEmployee(oldAddress));

        uint positionToReplace = employee[oldAddress].employeePoolIndex;
        uint payment = _calculatePayment(employee[oldAddress]);

        employee[newAddress].salary = employee[oldAddress].salary;
        employee[newAddress].lastPayday = now;
        employee[newAddress].employeePoolIndex = positionToReplace;
        employeePool[positionToReplace] = newAddress;
        delete employee[oldAddress];

        newAddress.transfer(payment);
    }

    function deleteEmployee(address e) public {
        require(msg.sender == owner && isEmployee(e));

        uint positoinToDelete = employee[e].employeePoolIndex;
        address addressToMove = employeePool[employeePool.length - 1];

        uint payment = _calculatePayment(employee[e]);
        employee[e].lastPayday = now;
        totalSalary -= employee[e].salary;
        e.transfer(payment);

        employeePool[positoinToDelete] = addressToMove;
        employee[addressToMove].employeePoolIndex = positoinToDelete;
        employeePool.length --;
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