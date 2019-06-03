import React, { Component } from 'react';
import Navbar from './Navbar'; 
import {
  Table,
  Container,
  Col
} from 'reactstrap';
import { withFirebase } from './Firebase'; 


class LeaderboardsPage extends Component {
  render() {
    return (
      <div id="leaderboards">
        <Navbar></Navbar>
        <h3 className="text-center mt-5 mb-5">Top Solvers</h3>
        <Leaderboards />
      </div>
    );
  }
}

class LeaderboardsBase extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      // Implement state here in the constructor. 
      users: [],
    };
  }
  
  componentDidMount() {
    // Returns a promise 
    this.props.firebase.returnTopTenUsers() 
    .then((snapshot) => {
      let users = snapshot.val(); 
      this.setState({
        users: users
      });
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Container> 
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Points Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>rwieruch</td>
                <td>9999999</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Ajay</td>
                <td>9999998</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Name3</td>
                <td>1</td>
              </tr>
            </tbody>
        </Table>
      </Col>
    </Container>      
    ); 
  }
}

const LeaderboardRow = () => {
  return (
    <tr>
      {/* The row number needs to be calulated beforehand */}
      <th scope="row">3</th>
      <td>
      {/* user email */}
      </td>
      <td>
      {/* user points */}
      </td>
    </tr>
  ); 
}

const Leaderboards = withFirebase(LeaderboardsBase);

export default LeaderboardsPage; 