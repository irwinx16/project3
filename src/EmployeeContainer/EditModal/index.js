import React, { Component } from 'react';
import './style.css';

class EditModal extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      position: '',
      notes: '',
      availability: ''
    }
  }
  componentDidMount() {
    this.findCurrentEmployee()
  }

  handleInput = (e) => {
    e.preventDefault();
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editEmployee(this.state)
  }
  findCurrentEmployee = () => {
    const currentEmployee = this.props.employees.filter(employee => employee.id == this.props.employeeId);
    const employeeToEdit = currentEmployee[0];
    this.setState({
      name: `${employeeToEdit.name}`,
      position: `${employeeToEdit.position}`,
      notes: `${employeeToEdit.notes}`,
      availability: `${employeeToEdit.availability}`
    })
  }
  render(){
    const showModal = this.props.showEditModal ? 'show' : 'hide';
    return (
      <div className={showModal}>
        <button onClick={this.props.closeEditModal}>Exit</button>
        <form onSubmit={this.handleSubmit}>
            Edit Employee: <br/>
          <input type="text" name="name" value={this.state.name} placeholder="Employee Name" onChange={this.handleInput} /> <br/>
          <input type="text" name="position" value={this.state.position} placeholder="Employee Position" onChange={this.handleInput} /> <br/>
          <input type="text" name="notes" value={this.state.notes} placeholder="Employee Notes" onChange={this.handleInput} /> <br/>
          <input type="text" name="availability" value={this.state.availability} placeholder="Employee Availability" onChange={this.handleInput} /> <br/>
          <button onClick={this.props.closeEditModal}>Submit</button>
        </form>
      </div>

    )
  }
}

export default EditModal;
