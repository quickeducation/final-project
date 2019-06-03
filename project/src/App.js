import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
    Container,
    Button,
    Row,
    Col,
    InputGroup,
    Input,
    InputGroupAddon
} from 'reactstrap';
// import logo from './logo.svg';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link
} from 'react-router-dom';
import Navbar from './Components/Navbar'; 
import CreateAccount from './Components/CreateAccount';
import MyAccount from './Components/MyAccount';
import Leaderboards from './Components/Leaderboards';
import LandingPage from './Components/LandingPage';
import SignUpPage from './Components/SignUp/'
import CreateProblemSetPage from './Components/CreateProblemSet';


// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the landing page
export default class App extends Component {
  // Renders the App component
  render() {
      return (
          <Router basename={process.env.PUBLIC_URL+'/'}>
              <Switch>
                  <Route exact path='/home' component={HomePage} />
                  <Route exact path='/landingPage' component={LandingPage} />
                  <Route exact path='/createAccount' component={CreateAccount} />
                  <Route exact path='/myAccount' component={MyAccount} />
                  <Route exact path='/leaderboards' component={Leaderboards} />
                  <Route exact path='/login' component={SignUpPage} />
                  <Route exact path='/createset' component={CreateProblemSetPage} />
                  <Route component={LandingPage} />
              </Switch>
          </Router>
      );
  }
}


// Main page for app
class HomePage extends Component {

  // Renders the HomePage component. Contains the Header, About and footer. 
  render() {
      return (
          <div id="main">
            <Navbar></Navbar>
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
                <InputGroup size="lg">
                    <Input placeholder="Examplelink.quicklearning.edu" />
                    <InputGroupAddon addonType="append">
                        <Button color="success">Start</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Container>
          </div>
      );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;