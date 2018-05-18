import React, { Component } from 'react';
import EmployeeList from '../EmployeeList';
import WhosWorkingList from '../WhosWorkingList';
import HireEmployeeModal from '../HireEmployeeModal';
import EmployeeProfile from '../EmployeeProfile';
import EditModal from '../EditModal';
import CreateShiftModal from '../CreateShiftModal';
import './style.css';

class EmployeeContainer extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      whosWorking: [],
      shifts: [],
      employeeId: '',
      showingAllEmployees: true,
      showHireModal: false,
      showingEmployeeProfile: false,
      editedEmployee: '',
      showEditModal: false,
      showCreateShiftModal: false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      employees: nextProps.employees,
      whosWorking: nextProps.whosWorking,
      shifts: nextProps.shifts,
      employeeId: nextProps.employeeId
    });
  }
  componentDidMount() {
    this.setState({
      employees: this.props.employees,
      whosWorking: this.props.whosWorking,
      shifts: this.props.shifts,
      employeeId: this.props.employeeId
    })
    {this.setMessageTimeout()}
  }

  // SHOW / HIDE MODALS

  // SHOW / HIDE ADD EMPLOYEE MODAL
  showHireEmployeeModal = () => {
    this.setState({showHireModal: true});
  }
  hideHireEmployeeModal = () => {
    this.setState({showHireModal: false});
  }

  // SHOW ALL EMPLOYEES VS SHOW PRESENT EMPLOYEES
  showAllEmployees = () => {
    this.setState({showingAllEmployees: true});
  }
  showWorkingEmployees = () => {
    this.setState({
      showingAllEmployees: false,
      showingEmployeeProfile: false
    });
  }

  // SHOW / HIDE ADD SHIFT MODAL
  openCreateShiftModal = () => {
    this.setState({
      showCreateShiftModal: true
    })
  }
  closeCreateShiftModal = () => {
    this.setState({
      showCreateShiftModal: false
    })
  }

  // SHOW / HIDE EMPLOYEE PROFILE
  showEmployeeProfile = (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    this.setState({
      showingEmployeeProfile: true,
      employeeId: id
    })
  }
  hideEmployeeProfile = () => {
    this.setState({
      showingEmployeeProfile: false
    })
  }

  // SHOW / HIDE EDIT MODAL
  openEditModal = (e) => {
    const employeeID = parseInt(this.state.employeeId)
    const editedEmployee = this.state.employees.find((employee) => {
      return employee.id === employeeID
    })
    this.setState({
      showEditModal: true,
      editedEmployee: editedEmployee
    });
  }
  closeEditModal = () => {
    this.setState({
      showEditModal: false
    })
  }

  // EMPLOYEE CRUD METHODS
  hireEmployee = async (employee, e) => {
    e.preventDefault();
    const employeesJson = await fetch ('https://ems-api.herokuapp.com/employees', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(employee)
    });
    const employeesParsed = await employeesJson.json();
    this.setState({
      employees: [...this.state.employees, employeesParsed.new_employee]
    })
  }
  editEmployee = async (editedEmployee) => {
    const id = this.state.employeeId;
    const employee = await fetch("https://ems-api.herokuapp.com/employees/" + id, {
      method: 'PUT',
      body: JSON.stringify(editedEmployee)
    })
    const response = await employee.json()

    const editedEmployeeIndex = this.state.employees.findIndex((employee) => {
      return employee.id == response.updated_employee.id;
    });
    this.state.employees[editedEmployeeIndex] = response.updated_employee;
    this.setState({
      editedEmployee: `${response.updated_employee}`
    })
  }
  deleteEmployee = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const employees = await fetch (`https://ems-api.herokuapp.com/employees/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    });
    this.setState({
      employees: this.state.employees.filter((employee) => employee.id != id)
    });
  }

  // SHIFT CRUD METHODS
  addShift = async (shift, e) => {
    e.preventDefault();
    const shiftsJson = await fetch ('https://ems-api.herokuapp.com/shifts', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(shift)
    })
    const shiftsParsed = await shiftsJson.json();
    this.setState({
      shifts: [...this.state.shifts, shiftsParsed.new_shift]
    })
    // we have to get whosworking again to update the page as soon as a shift is added
    this.props.getWhosWorking()
    .then((response) => {
      this.setState({
        whosWorking: response.whosworking
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  deleteShift = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const shifts = await fetch (`https://ems-api.herokuapp.com/shifts/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    });

    this.setState({
      shifts: this.state.shifts.filter((shift) => shift.id != id)
    });
    // we have to get whosworking again to update the page as soon as a shift is deleted
    this.props.getWhosWorking()
      .then((response) => {
        this.setState({
          whosWorking: response.whosworking
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  setMessageTimeout = () => {
    setTimeout(this.props.makeBlankMessage, 1000);
  }

  render() {

    return (
      <div>
        {this.state.showingEmployeeProfile ?
          <div>
            <CreateShiftModal showCreateShiftModal={this.state.showCreateShiftModal} openCreateShiftModal={this.openCreateShiftModal} closeCreateShiftModal={this.closeCreateShiftModal} addShift={this.addShift} employeeId={this.state.employeeId}/>
            <EditModal showEditModal={this.state.showEditModal} editedEmployee={this.state.editedEmployee} editEmployee={this.editEmployee} closeEditModal={this.closeEditModal} employees={this.state.employees} employeeId={this.state.employeeId}/>
            <EmployeeProfile employees={this.state.employees} employeeId={this.state.employeeId} hideEmployeeProfile={this.hideEmployeeProfile}  shifts={this.state.shifts} doLogout={this.props.doLogout} openEditModal={this.openEditModal} openCreateShiftModal={this.openCreateShiftModal} deleteShift={this.deleteShift} showWorkingEmployees={this.showWorkingEmployees}/>
          </div>
        : <div>
        { this.state.showingAllEmployees ?
          <div>
           <HireEmployeeModal hireEmployee={this.hireEmployee} hideHireEmployeeModal={this.hideHireEmployeeModal} showHireModal={this.state.showHireModal} />
          <EmployeeList employees={this.state.employees} showEmployeeProfile={this.showEmployeeProfile} showWorkingEmployees={this.showWorkingEmployees} showHireEmployeeModal={this.showHireEmployeeModal} deleteEmployee={this.deleteEmployee} doLogout={this.props.doLogout} message={this.props.message}/>
          </div>
        : <WhosWorkingList whosWorking={this.state.whosWorking} showEmployeeProfile={this.showEmployeeProfile} showAllEmployees={this.showAllEmployees} doLogout={this.props.doLogout}/>
        }
          </div>
        }
      </div>
    );
  }
}

export default EmployeeContainer;
