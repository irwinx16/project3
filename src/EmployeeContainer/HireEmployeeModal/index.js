import React, { Component } from 'react';
import './style.css';

class HireEmployeeModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			position: '',
			notes: '',
			availability: ''
		}
	}
	handleInput = (e) => {
        e.preventDefault();
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    }
    
	render() {
		const showModal = this.props.showHireModal ? 'show' : 'hide';
		return (
			<div className={showModal}>
				<button onClick={this.props.hideHireEmployeeModal}>Exit</button>
				<form onSubmit={this.props.hireEmployee.bind(null, this.state)}>
						New Employee: <br/>
					<input type="text" name="name" placeholder="Employee Name" onChange={this.handleInput} /> <br/>
					<input type="text" name="position" placeholder="Employee Position" onChange={this.handleInput} /> <br/>
					<input type="text" name="notes" placeholder="Employee Notes" onChange={this.handleInput} /> <br/>
					<input type="text" name="availability" placeholder="Employee Availability" onChange={this.handleInput} /> <br/>
					<button onClick={this.props.hideHireEmployeeModal}>Hire Employee</button>
				</form>
			</div>
		);
	}
}

export default HireEmployeeModal;
