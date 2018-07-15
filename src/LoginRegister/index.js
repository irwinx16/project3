import React, { Component } from 'react';
import { Jumbotron, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import './style.css';

class LoginRegister extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			registering: false,
		}
	}
	componentDidMount() {
		{this.setMessageTimeout()}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.registering) this.props.doRegister(this.state.username, this.state.password)
		else this.props.doLogin(this.state.username, this.state.password)
	}
	handleInput = (e) => {
		const whichField = e.currentTarget.name
		if (whichField === "username") this.setState({"username": e.currentTarget.value})
		else this.setState({"password": e.currentTarget.value})
	}
	registration = (e) => {
		this.setState({registering: true});
	}
	loggingIn = (e) => {
		this.setState({registering: false});
	}
	setMessageTimeout = () => {
		setTimeout(this.props.makeBlankLogOutMessage, 1000);
	}
	render() {
		return (
			<div>
				<Jumbotron>
	  				<h1>Welcome to EMS!</h1>
	  				<h3>Employee Management Software</h3>
					<h4> {this.props.logOutMessage} </h4>
					{this.props.logInErrorMessage.toString() !== '' ? <p className="login-error">{this.props.logInErrorMessage.toString()}</p> : null}

					<p><span className={this.state.registering ? "current" : null}onClick={this.registration}>Register</span> • <span className={!this.state.registering ? "current" : null} onClick={this.loggingIn}>Log In</span></p>
					<Form horizontal onSubmit={this.handleSubmit}>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={12}>
      							Username
   								</Col>
   							<Col sm={12}>
      							<FormControl type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
    						</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={12}>
								Password
							</Col>
							<Col sm={12}>
								<FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
							</Col>
						</FormGroup>
						<FormGroup>
	    					<Col smOffset={0} sm={12}>
	      						<Button bsStyle="primary" type="submit"> {this.state.registering ? "Register" : "Log In"}</Button>
	    					</Col>
  						</FormGroup>
					</Form>
				</Jumbotron>
			</div>
		)
	}
}

export default LoginRegister;
