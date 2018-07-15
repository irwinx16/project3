import React, { Component } from 'react';
import './style.css';

class CreateShiftModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			employee_id: '',
			start_shift: '',
			end_shift: '',
			notes: ''
		}
	}
	componentDidMount (){
		this.updateEmployeeId();
	}
	handleInput = (e) => {
    	e.preventDefault();
    	const key = e.currentTarget.name;
    	const value = e.currentTarget.value;
    	const obj = {};
    	obj[key] = value;
    	this.setState(obj);
    }
	updateEmployeeId = () => {
		this.setState({
			employee_id: `${this.props.employeeId}`
		})
	}
	updateStartShiftTime = (e) => {
		const start_shift_time = e.currentTarget.value
		this.setState({
			start_shift: [...this.state.start_shift, " ", start_shift_time].join().replace(/,/g,"")
		})
	}
	updateEndShiftTime = (e) => {
		const end_shift_time = e.currentTarget.value;
		this.setState({
			end_shift: [...this.state.end_shift, " ", end_shift_time].join().replace(/,/g,"")
		});
	}

	render() {
		const showModal = this.props.showCreateShiftModal ? 'show' : 'hide';
		if ({showModal} == 'hide') {
		}
		return (
			<div className={showModal}>
				<button onClick={this.props.closeCreateShiftModal}>Exit</button>
				<form onSubmit={this.props.addShift.bind(null, this.state)}>
						New Shift: <br/>
					<input type="text" defaultValue="" placeholder="Shift Name" onChange={this.handleInput} /> <br/>
					<input type="date" placeholder="Start of Shift Date (YYYY-MM-DD)" onChange={this.handleInput} /> <br/>
					<input type="time" defaultValue="" placeholder="Start of Shift Time (HH:MM:SS)" onChange={this.updateStartShiftTime} /> <br/>
					<input type="date" placeholder="End of Shift Date (YYYY-MM-DD)" onChange={this.handleInput} /> <br/>
					<input type="time" defaultValue="" placeholder="End of Shift Time (HH:MM:SS)" onChange={this.updateEndShiftTime} /> <br/>
					<input type="text" defaultValue="" placeholder="Shift Notes" onChange={this.handleInput} /> <br/>
					<button type="submit" onClick={this.props.closeCreateShiftModal}>Assign Shift</button> <br/>
					<button type="reset" value="Reset">Reset</button>
				</form>
			</div>
		);
	}
}

export default CreateShiftModal;
