import React, { Component } from 'react';
import Navbar from './Navbar'; 
import {
  Table,
  Container,
  Col
} from 'reactstrap';
import { withFirebase } from './Firebase'; 

const LeaderboardsPage = () => {
  <main className="Container"> 
    <LeaderboardsConst></LeaderboardsConst>
  </main>
}

class Leaderboards extends Component {
  render() {
    return (
      <div id="leaderboards">
        <Navbar></Navbar>
        <h3 className="text-center mt-5 mb-5">Top Solvers</h3>
        <LeaderboardsTable></LeaderboardsTable>
      </div>
    );
  }
}

class LeaderboardsTable extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      // Implement state here in the constructor. 
      loading: false,
      users: [],
    };
  }
  
  componentDidMount() {
    // Render
    this.setState({ loading: true });
    //this.props.firebase.db.collection('users').orderBy("points").limit(10);

    this.props.firebase.users().on('value', snapshot => {
      const usersObjects = snapshot.val(); 
      
      const usersList = Object.keys(usersObjects).map(key => ({
        ...usersObjects[key],
        uid: key,
      }));
      
      // Sets the users as a list instead of objects to make it easier to display. 
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  // Removes listener to avoid memory leaks 
  componentWillUnmount() {
    this.props.firebase.users().off(); 
  }

  render() {
    const users = this.state.users;
    let rank = 1; 
    const data = users.forEach((user) => {
      <tr>
        <th scope="row">{rank}</th>
        <td>{user.email}</td>
        <td>{user.points}</td>
      </tr>
      rank++; 
    })  

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

const LeaderboardsConst = withFirebase(Leaderboards);

export default LeaderboardsPage; 