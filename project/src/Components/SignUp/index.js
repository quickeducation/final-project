import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const SignUpPage = () => (
  <div>
    <p>Enter an email and password below and either sign in to an existing account or sign up</p>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };
  

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  isValidEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = event => {
    event.preventDefault();
    console.log(event.target)
    const { email, password} = this.state;
    if (!this.isValidEmail(email)) {
        alert("Invalid email address");
        return;
    }
    if (event.target.id !== "signUp") {
        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            console.log("signed in redirect them....");
            this.props.history.push('/home');
        })
        .catch(error => {
            console.log(error);
            this.setState({ error });
        });
    } else  {
        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            console.log("signed in redirect them....");
            this.props.history.push('/home');

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
    if (this.props.firebase.isSignedIn) {
        //this.props.history.push('/home');
    }
    return (
      <form onSubmit={this.onSubmit}>
        <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"/>
        <input name="password" value={password} onChange={this.onChange} type="password" 
          placeholder="Password"/>
        <button id="signUp" type="submit">Sign Up</button>
        <button id="signIn" type="submit">SignIn</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export {SignUpForm};