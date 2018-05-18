import React from 'react';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import './style.css';

const EmployeeList = ({employees, showEmployeeProfile, showWorkingEmployees, showHireEmployeeModal, deleteEmployee, doLogout, message}) => {
	const employeeList = employees.map((employee, i) => {
		return (
      <div className="container" key={employee.id}>
        <div className="row" id={employee.id}>
          <div className="box id">
            {employee.id}
          </div>
          <div className="box name">
            <span onClick={showEmployeeProfile}>{employee.name}</span>
          </div>
            <div className="box position">{employee.position}</div>
          <div className="box delete">
            <Button onClick={deleteEmployee} bsSize="small" bsStyle="danger">Delete</Button>
          </div>
        </div>
      </div>
        )
	})

	return (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>EMS</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={showHireEmployeeModal}>
              Hire New Employee
            </NavItem>
            <NavItem onClick={showWorkingEmployees}>
              Show Present Employees
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={doLogout}>
              Log Out
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h3> {message} </h3>
      <h4> Here are all the employees: </h4>

      <div className="container">
        <div className="wrapper">
          <div className="box id">ID</div>
          <div className="box name">Name</div>
          <div className="box position">Position</div>
          <div className="box delete">Delete</div>
        </div>
      </div>
				{employeeList}
		</div>
	);
}

export default EmployeeList;
