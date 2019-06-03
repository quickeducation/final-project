import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Components/Firebase/context';
import NavbarFeatures from '../Components/Navbar';

const LoginPage = () => (
    <div id="login">
        <NavbarFeatures />
        <p>Enter your email and password below to sign in</p>
        <LoginForm />
    </div>
  );
  
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
  
    
class LoginFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }
    
      isValidEmail = email => {
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
        const {email, password, error} = this.state;
        let currentUser = this.props.firebase.auth.currentUser;
        // if (currentUser) {
        //     this.props.history.push('/home');
        // }
        return (
        <form onSubmit={this.onSubmit}>
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
            <button id="login" type="submit">Log in</button>
            {error && <p>{error.message}</p>}
        </form>
        );
      }
}


const LoginForm = withRouter(withFirebase(LoginFormBase));

export default LoginPage;

