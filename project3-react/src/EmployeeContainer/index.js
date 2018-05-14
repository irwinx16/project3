import React, { Component } from 'react';
import EmployeeList from '../EmployeeList';
import WhosWorkingList from '../WhosWorkingList';
import './style.css';

class EmployeeContainer extends Component {
	constructor() {
		super();
		this.state = {
			employees: [],
			whosWorking: [],
			showEdit: false,
			editedEmployee: '',
			showAllEmployees: false
		}
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps, " this is nextProps from employee container");
		this.setState({
			employees: nextProps.employees,
			whosWorking: nextProps.whosWorking
		});
	}
	// componentDidMount() {
	// 	this.setState({
	// 		employees: this.props.employees,
	// 		whosWorking: this.props.whosWorking
	// 	})
	// }
	// showEdit = (e) => {
	// 	const employeeId = parseInt(e.target.nextSibling.id);
	// 	const editedEmployee = this.state.employees.find((employee) => {
	// 		return employee.id === employeeId;
	// 	})
	// 	this.setState({
	// 		showEdit: true,
	// 		editedEmployee: editedEmployee
	// 	})
	// }
	// deleteEmployee = async (e) => {
	// 	const id = e.currentTarget.id;
	// 	const employees = await fetch ('http://localhost:9292/employees/' + id, {
	// 		method: 'DELETE'
	// 	});

	// 	this.setState({
	// 		employees: this.state.employees.filter((employee) => employee.id != id)
	// 	});
	// }
	render() {
		console.log(this.state.whosWorking, " this is whosWorking in EmployeeContainer");
		return (
			<div>
				<h1> Welcome to the website. </h1>
				<h2> Here are all the employees: </h2>
				<EmployeeList employees={this.state.employees}/>
				<WhosWorkingList whosWorking={this.state.whosWorking} />
			</div>
		);
	}
}

export default EmployeeContainer;