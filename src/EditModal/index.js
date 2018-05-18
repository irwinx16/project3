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
  updateName = (e) => {
    const name = e.currentTarget.value;
    this.setState({
      name: name
    });
  }
  updatePosition = (e) => {
    const position = e.currentTarget.value;
    this.setState({
      position: position
    });
  }
  updateNotes = (e) => {
    const notes = e.currentTarget.value;
    this.setState({
      notes: notes
    });
  }
  updateAvailability = (e) => {
    const availability = e.currentTarget.value;
    this.setState({
      availability: availability
    });
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
          <input type="text" name="name" value={this.state.name} placeholder="Employee Name" onChange={this.updateName}/> <br/>
          <input type="text" name="position" value={this.state.position} placeholder="Employee Position" onChange={this.updatePosition}/> <br/>
          <input type="text" name="notes" value={this.state.notes} placeholder="Employee Notes" onChange={this.updateNotes} /> <br/>
          <input type="text" name="availability" value={this.state.availability} placeholder="Employee Availability" onChange={this.updateAvailability} /> <br/>
          <button onClick={this.props.closeEditModal}>Submit</button>
        </form>
      </div>

    )
  }
}

export default EditModal;
