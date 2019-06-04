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
import Navbar from './Components/Navbar'; 
import CreateAccount from './Components/CreateAccount';
import MyAccount from './Components/MyAccount';
import LeaderboardsPage from './Components/Leaderboards';
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
                  <Route exact path='/leaderboards' component={LeaderboardsPage} />
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