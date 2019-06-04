import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
    Container,
    Button,
    Row,
    Col,
    InputGroup,
    Input,
    InputGroupAddon,
    Form
} from 'reactstrap';
// import logo from './logo.svg';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link
} from 'react-router-dom';
import NavbarPage from './Components/Navbar'; 
import CreateAccount from './Components/CreateAccount';
import LoginPage from './Components/Login';
import MyAccount from './Components/MyAccount';
import LeaderboardsPage from './Components/Leaderboards';
import LandingPage from './Components/LandingPage';
import CreateProblemSetPage from './Components/CreateProblemSet';
import SignOut from './Components/Signout';


// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the landing page
export default class App extends Component {
  render() {
      return (
          <Router basename={process.env.PUBLIC_URL+'/'}>
              <Switch>
                  <Route exact path='/home' component={LandingPage} />
                  <Route exact path='/createAccount' component={CreateAccount} />
                  <Route exact path='/myAccount' component={MyAccount} />
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/createset' component={CreateProblemSetPage} />
                  <Route exact path='/signout' component={SignOut} />
                  <Route exact path='/leaderboards' component={LeaderboardsPage} />
                  <Route exact path='/landing' component={LandingPage} />
                  <Route component={LandingPage} />
              </Switch>
          </Router>
      );
  }
}


// Main page for app
class HomePage extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            problemSetLink: "" 
        };
    }


    handleSubmit = (e) => {
        e.preventDefault(); 
        let newProblemSetLink = e.target.problemSetLink.value; 
        this.setState({
            problemSetLink: newProblemSetLink
        });
        alert(`Getting problem set from link: ${newProblemSetLink}`);
        // Get problem set page with the given link. 
    }

  // Renders the HomePage component. Contains the navigation bar.
  render() {
      return (
          <div id="main">
            <NavbarPage></NavbarPage>
            <Container className="text-center mt-5 mb-5">
                <Row>
                    <Col>
                        <Button size="lg" color="primary" tag={Link} to="/createset">Create a Problem Set</Button>
                    </Col>
                    <Col>
                        <Button size="lg" color="primary" tag={Link} to="/leaderboards">View Leaderboards</Button>
                    </Col>
                </Row>
            </Container>
            <Container className="mx-auto mt-5">
                <h1 className="display-3 text-center">
                    Paste your problem set link below to start!
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup size="lg">
                        <Input id="problemSetLink" type="text" placeholder="Examplelink.quicklearning.edu"/>
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="success" tag={Link} to={this.state.problemSetLink}>Go</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </Container>
          </div>
      );
  }
}