import React from 'react';
import EditModal from '../EditModal';
import './style.css';

const EmployeeProfile = ({employees, employeeId, returnToMainPage, shifts, doLogout, openEditModal, openCreateShiftModal, deleteShift}) => {

	const returnEmployee = employees.filter(employee => employee.id == employeeId);
	const shownEmployee = returnEmployee[0];

	const employeeShifts = shifts.filter(shift => shift.employee_id == employeeId);
	const shiftList = employeeShifts.map((shift, i) => {
		return (
            <li key={shift.id} id={shift.id}>
                <b>Name:</b> {shift.name} <br/>
                <b>Start of Shift:</b> {shift.start_shift} <br/>
                <b>End of Shift:</b> {shift.end_shift} <br/>
                <b>Notes:</b> {shift.notes} <br/>
                <button key={shift.id} onClick={deleteShift}>Delete</button>
            </li>
        )
	})

	return (
		<div>

			<button onClick={returnToMainPage}>Return to Main Page</button>
			<button onClick={doLogout}>Log Out</button>

			<h1> {shownEmployee.name}'s Profile: </h1>
			<p>
				<b> Name: </b> {shownEmployee.name} <br/>
				<b> Position: </b> {shownEmployee.position} <br/>
				<b> Notes: </b> {shownEmployee.notes} <br/>
				<b> Availability: </b> {shownEmployee.availability}
			</p>
			<button onClick={openEditModal}>Edit Employee</button>

			<h3>{shownEmployee.name} has {shiftList.length} shifts scheduled.</h3>
			<button onClick={openCreateShiftModal}>Assign {shownEmployee.name} a new shift</button>
			<ul>
				{shiftList}
			</ul>

		</div>
	);
}

export default EmployeeProfile;
