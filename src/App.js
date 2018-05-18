import React, { Component } from 'react';
import './App.css';
import EmployeeContainer from './EmployeeContainer';
import LoginRegister from './LoginRegister';
class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      whosWorking: [],
      shifts: [],
      loggedIn: false,
      employeeId: '',
      message: '',
      logOutMessage: '',
      logInErrorMessage: ''
    }
  }

  // Logout Message / message set timeout
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

  // ALL GET METHODS //

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

  // LOGOUT

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
  // LOG IN

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
  // REGISTER

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
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <EmployeeContainer employees={this.state.employees} whosWorking={this.state.whosWorking} shifts={this.state.shifts} getWhosWorking={this.getWhosWorking} doLogout={this.doLogout} message={this.state.message} employeeId={this.state.employeeId} makeBlankMessage={this.makeBlankMessage}/>
        : <LoginRegister doLogin={this.doLogin} doRegister={this.doRegister} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage} makeBlankLogOutMessage={this.makeBlankLogOutMessage}/>
        }
      </div>
    );
  }
}

export default App;