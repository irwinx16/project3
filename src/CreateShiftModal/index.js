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
	updateName = (e) => {
		const name = e.currentTarget.value;
		this.setState({
			name: name
		});
	}
	updateEmployeeId = () => {
		this.setState({
			employee_id: `${this.props.employeeId}`
		})
	}
	updateStartShiftDate = (e) => {
		const start_shift_date = e.currentTarget.value;
		this.setState({
			start_shift: start_shift_date
		});
	}
	updateStartShiftTime = (e) => {
		const start_shift_time = e.currentTarget.value
		this.setState({
			start_shift: [...this.state.start_shift, " ", start_shift_time].join().replace(/,/g,"")
		})
	}
	updateEndShiftDate = (e) => {
		const end_shift_date = e.currentTarget.value;
		this.setState({
			end_shift: end_shift_date
		});
	}
	updateEndShiftTime = (e) => {
		const end_shift_time = e.currentTarget.value;
		this.setState({
			end_shift: [...this.state.end_shift, " ", end_shift_time].join().replace(/,/g,"")
		});
	}
	updateNotes = (e) => {
		const notes = e.currentTarget.value;
		this.setState({
			notes: notes
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.props.addShift, " this is the function we're calling to add the shift");

	}
	resetState = () => {
		this.setState({
			name: '',
			employee_id: '',
			start_shift: '',
			end_shift: '',
			notes: ''
		})
	}
	render() {
		const showModal = this.props.showCreateShiftModal ? 'show' : 'hide';
		if ({showModal} == 'hide') {
			console.log("modal is hidden");
		}
		return (
			<div className={showModal}>
				<button onClick={this.props.closeCreateShiftModal}>Exit</button>
				<form onSubmit={this.props.addShift.bind(null, this.state)}>
						New Shift: <br/>
					<input type="text" defaultValue="" placeholder="Shift Name" onChange={this.updateName}/> <br/>
					<input type="date" placeholder="Start of Shift Date (YYYY-MM-DD)" onChange={this.updateStartShiftDate} /> <br/>
					<input type="time" defaultValue="" placeholder="Start of Shift Time (HH:MM:SS)" onChange={this.updateStartShiftTime} /> <br/>
					<input type="date" placeholder="End of Shift Date (YYYY-MM-DD)" onChange={this.updateEndShiftDate} /> <br/>
					<input type="time" defaultValue="" placeholder="End of Shift Time (HH:MM:SS)" onChange={this.updateEndShiftTime} /> <br/>
					<input type="text" defaultValue="" placeholder="Shift Notes" onChange={this.updateNotes} /> <br/>
					<button type="submit" onClick={this.props.closeCreateShiftModal}>Assign Shift</button> <br/>
					<button type="reset" value="Reset">Reset</button>
				</form>
			</div>
		);
	}
}

export default CreateShiftModal;
