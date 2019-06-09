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
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        };
    }

    render() {
        let currentUser = this.props.firebase.auth.currentUser;
        if (currentUser) {
            this.props.firebase.doSignOut().then(() => {
                this.props.history.push('/home');
                return true;
            })
        } else {
            // No user is signed in.
        };
  
      return (
        // <div>
        //     <h1>You have signed out</h1>
        //     <p>You will be redirected to the home page in 2 seconds.</p>
        // </div>
        <div></div>
        // <Home></Home>
      );
    }
}

const LogoutPage = withRouter(withFirebase(SignOut));

export default SignOutPage