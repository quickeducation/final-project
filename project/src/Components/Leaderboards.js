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
      let newUsers = []; 
      snapshot.forEach((child) => {
        newUsers.push(child.val()); 
      })
      let newUsersList = [];
      // Not actually getting uids here, 
      // difficult to insert the correct pairs of
      // uids and user objects because the firebase 
      // query only sorts the child.val() of the snapshot
      // and not the snapshot key which is the uid. 
      for (let uid in newUsers) {
        newUsersList.push([uid, newUsers[uid]]); 
      }
      newUsersList = newUsersList.reverse();
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
                let currentUserEmail = user[1].email;
                let indexOfSymbol = currentUserEmail.indexOf("@");
                let truncatedEmail = currentUserEmail.substring(0, indexOfSymbol); 
                return (
                  // user[0] is the User ID from firebase
                  // user[1] is the User Object { email, score }
                  <tr key={user[0]}>
                    <th scope="row">{i + 1}</th>
                    <td>{truncatedEmail}</td>
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