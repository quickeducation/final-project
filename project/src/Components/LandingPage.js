import React, { Component } from 'react';
import Navbar from './Navbar'; 
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';


export default class LandingPage extends Component {

  render() {
    return (
      <div id="leaderboards">
        <Navbar></Navbar>
        <Container className="text-center mt-5 mb-5">
            <Row>
                <Col>
                    <Button size="lg" color="primary" tag={Link} to="/login">Login</Button>
                </Col>
                <Col>
                    <Button size="lg" color="primary" tag={Link} to="/createAccount">Create Account</Button>
                </Col>
            </Row>
        </Container>
        <Container className="mx-auto mt-5">
            <h1 className="display-3 text-center">Quick Education!</h1>
            <p className="lead mt-4">
                This is a website that is to help you practice math problems. You can
                create your own problem sets and practice them until you master them. Share
                your problem sets with others and you can compete to see who has solved the most!
            </p>
            <hr className="my-2" />
            <p className="text-center">
                In order to create problem sets and compete with others on the leaderboards, you 
                must sign into quickLearning. 
            </p>
        </Container>
      </div>
    );
  }
}