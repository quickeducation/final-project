import React, { Component } from 'react';
import NavbarPage from './Navbar'; 
import {
  Table,
  Container,
  Col,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  FormGroup,
  Form
} from 'reactstrap';
import { withFirebase } from './Firebase/context'; 

class MyAccountPage extends Component {

  render() {
    return (
      <div id="myAccount">
        <NavbarPage></NavbarPage>
        <h3 className="text-center mt-5 mb-5">Account Details</h3>
        <MyAccount/>
      </div>
    );
  }
}

const TEST_STATE = {
  email: "example@example.edu",
  points: 999999,
  editEmail: false
}

class MyAccountBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...TEST_STATE
    };
  }

  toggleEditEmail = (e) => {
    this.setState({ 
      editEmail: !this.state.editEmail
    });  
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    let newEmail = e.target.email.value;  
    this.props.firebase.editUsername(newEmail);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.firebase.deleteUser(); 
  }

  render() {
    const editClicked = this.state.editEmail;
    let emailInput; 

    // Conditional Rendering: 
    // Renders the edit email form if edit button is clicked 
    // otherwise reverts to user account details. 
    if (editClicked) {
      emailInput =
      <Form onSubmit={this.handleSubmit}>
        <InputGroup size="sm">
          <Input id="email" type="text" placeholder="Type New Email"/>
          <InputGroupAddon addonType="append">
            <Button type="submit" color="success">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    } else {
      emailInput = 
      <Container>
        <Table responsive borderless>
          <tbody>
            <tr>
              <th scope="row">Email:</th>
              <td>{this.state.email}</td>
              <td><Button size="sm" color="primary" onClick={this.toggleEditEmail}>Edit</Button></td>
            </tr>
            <tr>
              <th scope="row">Points:</th>
              <td>{this.state.points}</td>
            </tr>
          </tbody>
        </Table>
        <Container className="text-center mt-5 mb-5">
          <Button color="danger" onClick={this.handleDelete}>Delete Account</Button>
        </Container>
      </Container>
    }

    return (
      <Container> 
        <Col sm="12" md={{ size: 8, offset: 2 }}>
            {this.toggleEditEmail && emailInput}
        </Col>
      </Container>      
    ); 
  }
}

const MyAccount = withFirebase(MyAccountBase);

export default MyAccountPage; 