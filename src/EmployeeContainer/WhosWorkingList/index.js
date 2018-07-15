import React from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import './style.css';

const WhosWorkingList = ({whosWorking, showEmployeeProfile, showAllEmployees, doLogout}) => {
	const WhosWorkingList = whosWorking.map((employee, i) => {
		return (
			<div className="container" key={employee.id}>
			  	<div className="row-present" id={employee.id}>
			    	<div className="box id">
			       		{employee.id}
			        </div>
			    	<div className="box name">
			        	<span onClick={showEmployeeProfile}>{employee.name}</span>
			    	</div>
			    	<div className="box position">{employee.position}</div>
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
			       		<NavItem onClick={showAllEmployees}>
			        		Show All Employees
			       		</NavItem>
			    	</Nav>
			    	<Nav pullRight>
			        	<NavItem onClick={doLogout}>
			        		Log Out
			       		</NavItem>
			      	</Nav>
			  	</Navbar.Collapse>
		    </Navbar>
			<h2> Present Employees: </h2>
			<div className="container">
		    	<div className="wrapper-present">
			    	<div className="box id">ID</div>
			    	<div className="box name">Name</div>
			    	<div className="box position">Position</div>
		    	</div>
			</div>
			{WhosWorkingList}
		</div>
	);
}

export default WhosWorkingList;