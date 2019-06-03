import React, { Component } from 'react';
import Navbar from './Navbar'; 
import {
  Table,
  Container,
  Col,
  Button
} from 'reactstrap';
import { withFirebase } from './Firebase'; 

export default class MyAccount extends Component {
    render() {
      return (
        <div id="myAccount">
          <Navbar></Navbar>
          <h3 className="text-center mt-5 mb-5">Account Details</h3>
          <AccountDetailsTable></AccountDetailsTable>
          <Container className="text-center mt-5 mb-5">
            <Button color="danger">Delete Account</Button>
          </Container>
        </div>
      );
    }
}

class AccountDetailsTable extends Component {
  constructor(props) {
    
    this.state = {
      Email: "",
      Points: ""
    };
  }

  render() {
    return (
      <Container> 
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Table responsive borderless>
            <tbody>
              {/* <tr>
                <th scope="row">Username:</th>
                <td>rwieruch</td>
                <td><Button size="sm" color="primary">Edit</Button></td>
              </tr> */}
              <tr>
                <th scope="row">Email:</th>
                <td>exampleemail@quicklearning.edu</td>
                <td><Button size="sm" color="primary">Edit</Button></td>
              </tr>
              <tr>
                <th scope="row">Points:</th>
                <td>9999999</td>
              </tr>
            </tbody>
        </Table>
      </Col>
    </Container>      
    ); 
  }
}