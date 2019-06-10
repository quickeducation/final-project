import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Components/Firebase/context';
import NavbarFeatures from '../Components/Navbar';

const CreateAccountPage = () => (
    <div id="login">
        <NavbarFeatures />
        <CreateAccountForm />
    </div>
  );
  
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
  
    
class CreateAccountFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }
    
      isValidEmail = email => {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    
      onSubmit = event => {
        event.preventDefault();
        const { email, password} = this.state;
        if (!this.isValidEmail(email)) {
            alert("Invalid email address");
            return;
        } else {
          this.props.firebase
          .doCreateUserWithEmailAndPassword(email, password)
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
        const {email, password, error} = this.state;
        
        return (
          <div class="createlogin" id="createAcc">
            <h1>Sign up</h1>
            <p>Enter your email and password below to sign up</p>
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
              <button id="signupButton" type="submit">Sign Up</button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        );
      }
}


const CreateAccountForm = withRouter(withFirebase(CreateAccountFormBase));

export default CreateAccountPage