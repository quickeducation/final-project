import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Components/Firebase/context';

const SignOutPage = () => (
    <div id="logout">
        <LogoutPage />
    </div>
);

// Component that represents the signout screen for when the user signs out. 
class SignOut extends Component {
    render() {
        let currentUser = this.props.firebase.auth.currentUser;
        if (currentUser) {
            this.props.firebase.doSignOut().then(() => {
                window.setTimeout(() => {
                  window.location.href = "/home"
                }, 2000);
            })
        } else {
            // No user is signed in.
        };
  
      return (
        <div>
            <h1>You have signed out</h1>
            <p>You will be redirected to the home page in 2 seconds.</p>
        </div>
      );
    }
}

const LogoutPage = withRouter(withFirebase(SignOut));

export default SignOutPage