import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Components/Firebase/context';
import NavbarPage from '../Components/Navbar';
import {Redirect } from 'react-router-dom';

const LoginPage = () => (
    <div id="login">
        <NavbarPage />
        <LoginForm />
    </div>
  );
  
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    isLoggedIn:false,
    isLoading: false,
};
  
    
class LoginFormBase extends Component {
    constructor(props) {
        super(props);
        let isSignedIn = this.props.firebase.isSignedIn();
        this.state = { 
          email: '',
          password: '',
          error: null,
          isLoggedIn: isSignedIn,
          isLoading: false,
        };
      }

      componentWillMount() {
        let isSignedIn = this.props.firebase.isSignedIn();
        if (isSignedIn) {
          this.setState({
            isLoggedIn: isSignedIn,
            isLoading: false,
          });
        }
      }
    
      isValidEmail = email => {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    
      onSubmit = event => {
        event.preventDefault();
        const { email, password} = this.state;
        if (!this.isValidEmail(email)) {
            alert("Invalid email address");
            return;
        } else  {
            this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                console.log("signed in redirect them....");
                this.props.history.push('/home');
                return true;
            })
            .catch(error => {
                console.log(error);
                this.setState({ error });
            });
        }
      }
    
      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
      render() {
        const {email, password, error, isLoggedIn} = this.state;
        if (isLoggedIn) {
          return (
            <Redirect to={{pathname:"/home"}} />
          );
        } else {
          return (
            <div class="createlogin" id="login">
              <h1>Log in</h1>
              <p>Enter your email and password below to sign in</p>
              <form class="accForm" onSubmit={this.onSubmit}>
                <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                />
                <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />
                <button id="loginButton" type="submit">Log in</button>
                {error && <p>{error.message}</p>}
              </form>
            </div>
            );
        }
        
      }
}


const LoginForm = withRouter(withFirebase(LoginFormBase));

export default LoginPage;

