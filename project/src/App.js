import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavbarFeatures from './Components/Navbar';
import CreateAccount from './Components/CreateAccount';
import Leaderboards from './Components/Leaderboards';
import LoginPage from './Components/Login';
import MyAccount from './Components/MyAccount';
import CreateProblemSetPage from './Components/CreateProblemSet';
import SignOut from './Components/Signout';


// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the home page
export default class App extends Component {
  render() {
      return (
          <Router basename={process.env.PUBLIC_URL+'/'}>
              <Switch>
                  <Route exact path='/home' component={HomePage} />
                  <Route exact path='/createAccount' component={CreateAccount} />
                  <Route exact path='/myAccount' component={MyAccount} />
                  <Route exact path='/leaderboards' component={Leaderboards} />
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/createset' component={CreateProblemSetPage} />
                  <Route exact path='/signout' component={SignOut} />
                  <Route component={HomePage} />
              </Switch>
          </Router>
      );
  }
}

// Main page for app
class HomePage extends Component {

  // Renders the HomePage component. Contains the navigation bar.
  render() {
      return (
          <div id="main">
              <NavbarFeatures />
          </div>
      );
  }
}