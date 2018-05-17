import React, { Component } from 'react';
import './App.css';
import EmployeeContainer from './EmployeeContainer';
import LoginRegister from './LoginRegister';
import EmployeeProfile from './EmployeeProfile';
import EditModal from './EditModal';
import CreateShiftModal from './CreateShiftModal';
class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      whosWorking: [],
      shifts: [],
      loggedIn: false,
      showingEmployee: false,
      employeeId: '',
      message: '',
      logOutMessage: '',
      logInErrorMessage: '',
      editedEmployee: '',
      showEditModal: false,
      showCreateShiftModal: false
    }
  }
  // componentDidMount() {
  //   this.setState({this.state})
  // }
  makeBlankMessage = () => {
    this.setState({
      message: ''
    });
  }
  makeBlankLogOutMessage = () => {
    this.setState({
      logOutMessage: ''
    });
  }
  getEmployees = async () => {
    const employeesJson = await fetch('http://localhost:9292/employees', {
      credentials: 'include'
    });
    const employees = await employeesJson.json();
    return employees;
  }
  getWhosWorking = async () => {
    const whosWorkingJson = await fetch('http://localhost:9292/employees/whosworking', {
      credentials: 'include'
    });
    const whosWorking = await whosWorkingJson.json();
    return whosWorking;
  }
  getShifts = async () => {
    const shiftsJson = await fetch('http://localhost:9292/shifts', {
      credentials: 'include'
    });
    const shifts = await shiftsJson.json();
    return shifts;
  }
  getEmployers = async () => {
    const employersJson = await fetch('http://localhost:9292/employers', {
      credentials: 'include'
    });
    const employers = await employersJson.json();
    return employers;
  }
  doLogout = async () => {
    const logoutJson = await fetch('http://localhost:9292/employers/logout', {
      credentials: 'include' // you MUST include in ALL ajax requests
    })
    const loggedOut = await logoutJson.json();
    if (loggedOut.success) {
      this.setState({
        loggedIn: false,
        logOutMessage: loggedOut.message,
        showingEmployee: false
      })
    }
    return loggedOut;
  }
  doLogin = async (username, password) => {
    const loginJson = await fetch('http://localhost:9292/employers/login', {
      method: 'POST',
      credentials: 'include', // you MUST include in ALL ajax requests
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const loggedIn = await loginJson.json();
    if (loggedIn.success) {
      this.setState({
        loggedIn: true,
        logInErrorMessage: '',
        message: `Welcome back, ${username}!`
      })
      this.getEmployees()
      .then((response) => {
        this.setState({
          employees: response.employees
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getEmployers()
      .then((response) => {
        this.setState({
          employers: response.employers
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getShifts()
      .then((response) => {
        this.setState({
          shifts: response.shifts
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getWhosWorking()
      .then((response) => {
        this.setState({
          whosWorking: response.whosworking
        })
      })
      .catch((err) => {
        console.log(err);
      })

    } else {
      this.setState({
        logInErrorMessage: loggedIn.message
      });
    }
  }
  doRegister = async (username, password) => {
    const registerJson = await fetch('http://localhost:9292/employers/register', {
      method: 'POST',
      credentials: 'include', // you MUST include in ALL ajax requests
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const parsedRegisterResponse = await registerJson.json();
    if (parsedRegisterResponse.success) {

      this.setState({
        loggedIn: true,
        message: `Welcome to the site, ${username}!`
      })

      this.getEmployees()
      .then((response) => {
        this.setState({
          employees: response.employees
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getEmployers()
      .then((response) => {
        this.setState({
          employers: response.employers
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getShifts()
      .then((response) => {
        this.setState({
          shifts: response.shifts
        })
      })
      .catch((err) => {
        console.log(err);
      })

      this.getWhosWorking()
      .then((response) => {
        this.setState({
          whosWorking: response.whosworking
        })
      })
      .catch((err) => {
        console.log(err);
      })

    } else {
      this.setState({
        logInErrorMessage: parsedRegisterResponse.message
      });
    }
  }
  addShift = (shift, e) => {
    e.preventDefault();
    fetch ('http://localhost:9292/shifts', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(shift)
<<<<<<< HEAD
    }).then(r=> { console.log("fetch is done, response r = ", r);
      this.getWhosWorking()
        .then(response => {
          console.log("got whos working and about to add based on response ", response);
          this.setState({
            whosWorking: response.whosworking
          })
        });
      })
    // const shiftsParsed = await shiftsJson.json();
    // console.log(shiftsParsed.new_shift);
    // this.setState({
    //   shifts: [...this.state.shifts, shiftsParsed.new_shift]
    // })
    // console.log(this.state, "to see if it's there in addShift after adding in App.js")
=======
    })
    const shiftsParsed = await shiftsJson.json();
    this.setState({
      shifts: [...this.state.shifts, shiftsParsed.new_shift]
    })
    // we have to get whosworking again to update the page as soon as a shift is added
     this.getWhosWorking()
      .then((response) => {
        this.setState({
          whosWorking: response.whosworking
        })
      })
      .catch((err) => {
        console.log(err);
      })
>>>>>>> 434dc4e1661f8a05469be5be2aacb668d4bce6d7
  }
  deleteShift = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const shifts = await fetch (`http://localhost:9292/shifts/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    });

    this.setState({
      shifts: this.state.shifts.filter((shift) => shift.id != id)
    });
    // we have to get whosworking again to update the page as soon as a shift is deleted
    this.getWhosWorking()
      .then((response) => {
        this.setState({
          whosWorking: response.whosworking
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
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
  showEmployeeProfile = (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    this.setState({
      showingEmployee: true,
      employeeId: id
    })
  }
  returnToMainPage = () => {
    this.setState({
      showingEmployee: false
    })
  }
  hireEmployee = async (employee, e) => {
      e.preventDefault();
      const employeesJson = await fetch ('http://localhost:9292/employees', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(employee)
      });
      const employeesParsed = await employeesJson.json();
      this.setState({
        employees: [...this.state.employees, employeesParsed.new_employee]
      })
  }
  deleteEmployee = async (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const employees = await fetch (`http://localhost:9292/employees/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    });

    this.setState({
      employees: this.state.employees.filter((employee) => employee.id != id)
    });
  }
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
  editEmployee = async (editedEmployee) => {
    const id = this.state.employeeId;
    const employee = await fetch("http://localhost:9292/employees/" + id, {
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

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
          {this.state.showingEmployee ?
            <div>
              <CreateShiftModal showCreateShiftModal={this.state.showCreateShiftModal} openCreateShiftModal={this.openCreateShiftModal} closeCreateShiftModal={this.closeCreateShiftModal} addShift={this.addShift} employeeId={this.state.employeeId}/>
              <EditModal showEditModal={this.state.showEditModal} editedEmployee={this.state.editedEmployee} editEmployee={this.editEmployee} closeEditModal={this.closeEditModal} employees={this.state.employees} employeeId={this.state.employeeId}/>
              <EmployeeProfile employees={this.state.employees} employeeId={this.state.employeeId} returnToMainPage={this.returnToMainPage}  shifts={this.state.shifts} doLogout={this.doLogout} openEditModal={this.openEditModal} openCreateShiftModal={this.openCreateShiftModal} deleteShift={this.deleteShift}/>
            </div>
          : <div>
              <EmployeeContainer employees={this.state.employees} whosWorking={this.state.whosWorking} showEmployeeProfile={this.showEmployeeProfile} hireEmployee={this.hireEmployee} getEmployees={this.getEmployees} deleteEmployee={this.deleteEmployee} doLogout={this.doLogout} message={this.state.message} makeBlankMessage={this.makeBlankMessage} shifts={this.state.shifts} />
            </div>
          }
          </div>
        : <LoginRegister doLogin={this.doLogin} doRegister={this.doRegister} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage} makeBlankLogOutMessage={this.makeBlankLogOutMessage}/>
        }
      </div>
    );
  }
}

export default App;
