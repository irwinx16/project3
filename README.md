# EMS
Employee Management Software: Manage your employees with our API!

## User Story

Employer should be able to register and login. 
- Be able to see information of the present employees at the moment of login. 
- Be able to click on each employee and see that employee information
(name, position, notes, availability, and shifts).
- Be able to see all the employees listed by name.
- Be able to edit the information of each employee.
- Be able to add new employees.
- Be able to delete employees. 
- Be able to add shift (breakfast, lunch, dinner, brunch, etc.).
- Be able to assign shifts to employees. 

## How to Use the API

### GET ROUTES

#### Get Employees

https://ems-api.herokuapp.com/employees

#### Get Employees Currently Working

https://ems-api.herokuapp.com/employees/whosworking

#### Get Shifts

https://ems-api.herokuapp.com/shifts

#### Get Employers

https://ems-api.herokuapp.com/employers

#### Log Out

https://ems-api.herokuapp.com/logout

### SHOW ROUTES

#### Show Employees

https://ems-api.herokuapp.com/employees/:id

#### Show Shifts

https://ems-api.herokuapp.com/shifts/:id

#### Show Employee's Shifts

https://ems-api.herokuapp.com/shifts/employee/:employee_id

#### Show Employers

https://ems-api.herokuapp.com/employers/:id

### POST ROUTES

#### Log In

https://ems-api.herokuapp.com/login

#### Register

https://ems-api.herokuapp.com/register

#### Add Employee

https://ems-api.herokuapp.com/employees

#### Add Shift

https://ems-api.herokuapp.com/shifts

#### Add Employer

https://ems-api.herokuapp.com/employers

### DELETE ROUTES

#### Delete Employee

https://ems-api.herokuapp.com/employees/:id

#### Delete Shift

https://ems-api.herokuapp.com/shifts/:id

#### Delete Employer

https://ems-api.herokuapp.com/employers/:id




## DATA TABLES

Employee Table

- ID
- Name
- Position
- Notes
- Availability
- Working?

Employer Table

- ID
- Name
- Username
- Password
- employee_id

Shift Table

- ID
- Name
- Start
- End
- Notes
- Employee_ID

## Wireframe

![Wireframe](Wireframe/WireFrame.jpeg)