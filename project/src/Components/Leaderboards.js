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

const TEST_STATE = {
  users: [
    {
      email: "a@uw.edu",
      points: 10,
      uid: 1111
    },
    {
      email: "b@uw.edu",
      points: 10,
      uid: 1222
    },
    {
      email: "c@uw.edu",
      points: 10,
      uid: 13333
    },
    {
      email: "d@uw.edu",
      points: 10,
      uid: 14444
    }
  ]
}

class LeaderboardsBase extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      ...TEST_STATE
    };
  }
  
  componentDidMount() {
    // Returns a promise 
    this.props.firebase
    .returnAllUsers() 
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
              {this.state.users.map((user, i) => {
                return (
                  <tr key={user.uid}>
                    <th scope="row">{i + 1}</th>
                    <td>{user.email}</td>
                    <td>{user.points}</td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
      </Col>
    </Container>      
    ); 
  }
}

const Leaderboards = withFirebase(LeaderboardsBase);

export default LeaderboardsPage; 