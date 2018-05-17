import React, { Component } from 'react';
import EmployeeList from '../EmployeeList';
import WhosWorkingList from '../WhosWorkingList';
import HireEmployeeModal from '../HireEmployeeModal';
import './style.css';

class EmployeeContainer extends Component {
	constructor() {
		super();
		this.state = {
			employees: [],
			whosWorking: [],
			showAllEmployees: true,
			showHireModal: false
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			employees: nextProps.employees,
			whosWorking: nextProps.whosWorking
		});
	}
	componentDidMount() {
		this.setState({
			employees: this.props.employees,
			whosWorking: this.props.whosWorking

		})
	}
	hideHireEmployeeModal = () => {
		this.setState({showHireModal: false});
	}
	showHireEmployeeModal = () => {
		this.setState({showHireModal: true});
	}
	showEmployeeList = () => {
		this.setState({showAllEmployees: true});
	}
	showWorkingEmployees = () => {
		this.setState({showAllEmployees: false});
	}
	setMessageTimeout = () => {
		setTimeout(this.props.makeBlankMessage, 1000);
	}
	render() {
		{this.setMessageTimeout()}
		return (
			<div>
				{ this.state.showAllEmployees ?
					<div>
						<HireEmployeeModal hireEmployee={this.props.hireEmployee} hideHireEmployeeModal={this.hideHireEmployeeModal}showHireModal={this.state.showHireModal} />
						<EmployeeList employees={this.state.employees} showEmployeeProfile={this.props.showEmployeeProfile} showWorkingEmployees={this.showWorkingEmployees} showHireEmployeeModal={this.showHireEmployeeModal}
							deleteEmployee={this.props.deleteEmployee} doLogout={this.props.doLogout} message={this.props.message}/>
					</div>
				:	<WhosWorkingList whosWorking={this.state.whosWorking} showEmployeeProfile={this.props.showEmployeeProfile} showEmployeeList={this.showEmployeeList} doLogout={this.props.doLogout}/>
				}
			</div>
		);
	}
}

export default EmployeeContainer;
