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
      users: []
    };
  }
  
  componentDidMount() {
    // Returns a promise 
    this.props.firebase
    .returnTopTenUsers() 
    .then((snapshot) => {
      let newUsers = snapshot.val(); 
      let newUsersList = [];
      for (let uid in newUsers) {
        newUsersList.push([uid, newUsers[uid]]); 
      }
      this.setState({
        users: newUsersList
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
                  // user[0] is the User ID
                  // user[1] is the User Object { email, score }
                  <tr key={user[0]}>
                    <th scope="row">{i + 1}</th>
                    <td>{user[1].email}</td>
                    <td>{user[1].score}</td>
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