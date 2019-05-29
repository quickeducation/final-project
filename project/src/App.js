import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavbarFeatures from './Components/Navbar';
import CreateAccount from './Components/CreateAccount';
import Leaderboards from './Components/Leaderboards';
import SignUpPage from './Components/SignUp/'
import CreateProblemSetPage from './Components/CreateProblemSet';


// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the home page
export default class App extends Component {
  // Renders the App component
  render() {
      return (
          <Router basename={process.env.PUBLIC_URL+'/'}>
              <Switch>
                  <Route exact path='/home' component={HomePage} />
                  <Route exact path='/createAccount' component={CreateAccount} />
                  <Route exact path='/leaderboards' component={Leaderboards} />
                  <Route exact path='/login' component={SignUpPage} />
                  <Route exact path='/createset' component={CreateProblemSetPage} />
                  <Route component={HomePage} />
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