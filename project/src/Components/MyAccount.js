import React, { Component } from 'react';
import NavbarPage from './Navbar'; 
import {
  Table,
  Container,
  Col,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Form
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withFirebase } from './Firebase/context'; 
import LoadingScreen from './LoadingScreen';
import { AuthUserContext } from './Session';

class MyAccountPage extends Component {

  render() {
    return (
      <AuthUserContext.Consumer>
      { authUser => {
        if (authUser) {
          return (
            <div id="myAccount">
              <NavbarPage></NavbarPage>
              <h3 className="text-center mt-5 mb-5">Account Details</h3>
              <MyAccount userUID={authUser.uid}/>
            </div>
          );
        }
        return <Redirect to="/"/>
      }
    }
      </AuthUserContext.Consumer>
    );
  }
}

const DEFAULT_STATE = {
  user: {
    email: "",
    displayName:"",
    score: 0
  },
  editDisplayName: false,
  isLoading: true,
}

class MyAccountBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_STATE
    };
  }

  componentDidMount() {
    this.updateState(); 
  }

  updateState = () => { 
    this.props.firebase.getUserScoreNameAndEmail(this.props.userUID)
      .then((snapshot) => {
        this.setState({
          user: snapshot.val(),
          isLoading: false
        })
      })
      .catch(error => alert("Failed to download user data. " + error))
  }
  
  toggleEditDisplayName = () => {
    this.setState({ 
      editDisplayName: !this.state.editDisplayName
    });  
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    this.setState({isLoading:true});
    let newDisplayName = e.target.email.value;
    this.props.firebase.editDisplayName(newDisplayName, this.props.userUID)
    .then((response) => {
      if (response) {
        alert("Display Name: "+ newDisplayName + " Already Exists.");
        this.setState({isLoading:false})
      } else {
        this.updateState();
        this.toggleEditDisplayName();
      }
    })
    .catch(error => {
      alert("Connection Error, try refreshing your page.");
      this.setState({isLoading:false})
    })
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.firebase.deleteUser(); 
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen />
      )
    }
    const editClicked = this.state.editDisplayName;
    let emailInput; 
    // Conditional Rendering: 
    // Renders the edit email form if edit button is clicked 
    // otherwise reverts to user account details. 
    if (editClicked) {
      emailInput =
      <Form onSubmit={this.handleSubmit}>
        <InputGroup size="sm">
          <Input id="email" type="text" placeholder="Type Display Name"/>
          <InputGroupAddon addonType="append">
            <Button type="submit" color="success">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    } else {
      emailInput = 
      <Container>
        <Table responsive borderless>
          <tbody>
            <tr>
              <th scope="row">Email:</th>
              <td>{this.state.user.email}</td>
            </tr>
            <tr>
              <th scope="row">Display Name: </th>
              <td>{this.state.user.displayName}</td>
              <td><Button size="sm" color="primary" onClick={this.toggleEditDisplayName}>Edit</Button></td>
            </tr>
            <tr>
              <th scope="row">Points Earned:</th>
              <td>{this.state.user.score}</td>
            </tr>
          </tbody>
        </Table>
        <Container className="text-center mt-5 mb-5">
          <Button color="danger" onClick={this.handleDelete}>Delete Account</Button>
        </Container>
      </Container>
    }

    return (
      <Container> 
        <Col sm="12" md={{ size: 8, offset: 2 }}>
            {this.toggleEditDisplayName && emailInput}
        </Col>
      </Container>      
    ); 
  }
}

const MyAccount = withFirebase(MyAccountBase);

export default MyAccountPage; 