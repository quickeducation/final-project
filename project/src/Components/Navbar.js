import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { withFirebase } from '../Components/Firebase/context';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand} from 'reactstrap';


const NavbarPage = () => (
    <NavbarComponent />
)


class NavbarFeatures extends Component {
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
        let user = this.props.firebase.auth.currentUser;
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
                    <NavItem>
                        <NavLink tag={Link} to="/leaderboards">Leaderboards</NavLink>
                    </NavItem>
                    {user ? <NavItem>
                                <NavLink id="signout" tag={Link} to="/signout">Log Out</NavLink>
                            </NavItem> : <div></div>}
                </Nav>
                </Collapse>
                </Navbar>

            </nav>
        );
    }
}

// Component that represents the navigation bar items. These items can be clicked on and the user will be navigated to
// the various paths. 
class NavItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        };
    }   

    render() {
        return(
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/home">Home</NavLink>
                </NavItem>
                {!this.user ? <NavItem>
                            <NavLink tag={Link} to="/login">Log in</NavLink>
                        </NavItem> : <div></div>}
                {!this.user ? <NavItem>
                            <NavLink tag={Link} to="/createAccount">Create Account</NavLink>
                        </NavItem> : <div></div>}
                {this.user ? <NavItem>
                            <NavLink tag={Link} to="/myAccount">My Account</NavLink>
                        </NavItem> : <div></div>}
                <NavItem>
                    <NavLink tag={Link} to="/leaderboards">Leaderboards</NavLink>
                </NavItem>
                {this.user ? <NavItem>
                            <NavLink id="signout" tag={Link} to="/signout">Log Out</NavLink>
                        </NavItem> : <div></div>}
            </Nav>
        );
    }
}

const NavbarComponent = withFirebase(NavbarFeatures);

export default NavbarPage