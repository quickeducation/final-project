import React, { Component } from 'react';
import Navbar from './Navbar'; 
import {
  Table,
  Container,
  Col
} from 'reactstrap';


export default class Leaderboards extends Component {
  constructor() {
    super(); 
    this.state = {
      // Implement state here in the constructor. 
    }
  }
  
  componentDidMount() {
    // Render
  }

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

const LeaderboardRow = (props) => {
  return (
    <tr>
      {/* The row number needs to be calulated beforehand */}
      <th scope="row">3</th>
      <td>
        { props.data.username }
      </td>
      <td>
        { props.data.points }
      </td>
    </tr>
  ); 
}