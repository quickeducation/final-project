import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
// import firebase from 'firebase/app';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand} from 'reactstrap';

export default class NavbarFeatures extends Component {
    // Constructor sets state for navigation
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    
    // Changes the state isOpen on toggle.
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <nav>
                <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">QuickEducation</NavbarBrand>
                <NavbarToggler onClick={this.toggle} aria-label="Navbar Toggle"/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <NavItems />
                </Collapse>
                </Navbar>
            </nav>
        );
    }
}

// Component that represents the navigation bar items. These items can be clicked on and the user will be navigated to
// the various paths. 
class NavItems extends Component {

    render() {
        // let user = firebase.auth().currentUser;

        return(
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/createAccount">Create Account</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/myAccount">My Account</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/leaderboards">Leaderboards</NavLink>
                </NavItem>
                {/* {!user ? <NavItem>
                            <NavLink tag={Link} to="/signin">Sign In</NavLink>
                        </NavItem> : <div></div>}
                {user ? <NavItem>
                            <NavLink id="signout" tag={Link} to="/signout">Sign Out</NavLink>
                        </NavItem> : <div></div>} */}
            </Nav>
        );
    }
}
