import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { withFirebase } from '../Components/Firebase/context';
import { withRouter } from 'react-router-dom';
import {  AuthUserContext } from '../Components/Session';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand} from 'reactstrap';


const NavbarPage = () => (
    <AuthUserContext.Consumer> 
    { context => 
        <NavbarComponent user={context.authUser}/>
    }
      </AuthUserContext.Consumer>
    
)


class NavbarFeatures extends Component {
    // Constructor sets state for navigation
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isUserLoggedIn:false,
        };
    }
    
    // Changes the state isOpen on toggle.
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    handleClick(event) {
        let currentUser = this.props.firebase.auth.currentUser;
        if (currentUser) {
            this.props.firebase.doSignOut().then(() => {
                this.props.history.push('/home');
                return true;
            })
        } else {
            // No user is signed in.
        };
    }


    render() {
        let user = this.props.user;
        console.log(user)
        return (
            <nav>
                <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">QuickEducation</NavbarBrand>
                <NavbarToggler onClick={this.toggle} aria-label="Navbar Toggle"/>
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {user ? 
                        <NavItem>
                            <NavLink tag={Link} to="/home">Home</NavLink>
                        </NavItem> : <NavItem>
                            <NavLink tag={Link} to="/landing">Home</NavLink>
                        </NavItem>}
                    
                    {!user ? <NavItem>
                                <NavLink tag={Link} to="/login">Log in</NavLink>
                            </NavItem> : <div></div>}
                    {!user ? <NavItem>
                                <NavLink tag={Link} to="/createAccount">Create Account</NavLink>
                            </NavItem> : <div></div>}
                    {user ? <NavItem>
                                <NavLink tag={Link} to="/myAccount">My Account</NavLink>
                            </NavItem> : <div></div>}
                    {user ? <NavItem>
                                <NavLink tag={Link} to="/leaderboards">Leaderboards</NavLink>
                            </NavItem> : <div></div>}
                    {!user ? <NavItem>
                                <NavLink tag={Link} to="/login">Leaderboards</NavLink>
                            </NavItem> : <div></div>}
                    {user ? <NavItem>
                                <NavLink id="signout" onClick={()=> this.handleClick()}>Log Out</NavLink>
                            </NavItem> : <div></div>}
                </Nav>
                </Collapse>
                </Navbar>

            </nav>
        );
    }
}


const NavbarComponent = withRouter(withFirebase(NavbarFeatures));

export default NavbarPage