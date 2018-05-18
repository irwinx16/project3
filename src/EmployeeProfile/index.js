import React from 'react';
import EditModal from '../EditModal';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import './style.css';

const EmployeeProfile = ({employees, employeeId, hideEmployeeProfile, shifts, doLogout, openEditModal, openCreateShiftModal, deleteShift, showWorkingEmployees}) => {

	const returnEmployee = employees.filter(employee => employee.id == employeeId);
	const shownEmployee = returnEmployee[0];
	const employeeShifts = shifts.filter(shift => shift.employee_id == employeeId);

	// the Start of Shift and End of Shift code below looks messy
	// we're reformatting the output to be more human-friendly using a chain of string methods
	const shiftList = employeeShifts.map((shift, i) => {
		return (
			<div className="containerProfile" key={shift.id}>
				<div className="rowProfile" id={shift.id}>
					<div className="boxProfile id">
						{shift.id}
					</div>
					<div className="boxProfile name">
						{shift.name}
					</div>
					<div className="boxProfile startShift">
						{shift.start_shift.toString().replace(/t/i, " ").replace(/.000Z/i, "").slice(0,16)}
					</div>
					<div className="boxProfile endShift">
						{shift.end_shift.toString().replace(/t/i, " ").replace(/.000Z/i, "").slice(0,16)}
					</div>
					<div className="boxProfile notes">
						{shift.notes}
					</div>
					<div className="boxProfile delete">
       					<Button onClick={deleteShift} bsSize="small" bsStyle="danger">Delete</Button>
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
		        <a href="#">EMS</a>
		    	</Navbar.Brand>
		    	<Navbar.Toggle />
		  	</Navbar.Header>
		  	<Navbar.Collapse>
		     	<Nav>
	          <NavItem onClick={hideEmployeeProfile}>
	          	Show All Employees
	          </NavItem>
	          <NavItem onClick={showWorkingEmployees}>
	          	Show Present Employees
	          </NavItem>
	          <NavItem onClick={openEditModal}>
	          	Edit {shownEmployee.name}'s Profile
	          </NavItem>
	          <NavItem onClick={openCreateShiftModal}>
	          	Assign {shownEmployee.name} a New Shift
	          </NavItem>
		     	</Nav>
		      <Nav pullRight>
		        <NavItem onClick={doLogout}>
		          Log Out
		        </NavItem>
		      </Nav>
		  	</Navbar.Collapse>
		   </Navbar>
			<h1> {shownEmployee.name}'s Profile: </h1>
			<h3>
				<b> Name: </b> {shownEmployee.name} <br/>
				<b> Position: </b> {shownEmployee.position} <br/>
				<b> Notes: </b> {shownEmployee.notes} <br/>
				<b> Availability: </b> {shownEmployee.availability}
			</h3>

			<h3>{shownEmployee.name} has {shiftList.length} shifts scheduled.</h3>
			<div className="containerProfile">
        <div className="wrapperProfile">
          <div className="boxProfile id">ID</div>
          <div className="boxProfile name">Name</div>
		  <div className="boxProfile startShift">Start Shift</div>
          <div className="boxProfile endShift">End Shift</div>
          <div className="boxProfile notes">Notes</div>
          <div className="boxProfile delete">Delete</div>
        </div>
      </div>
			{shiftList}
		</div>
	);
}

export default EmployeeProfile;
