import React, {Component}  from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthUserContext } from './Session';
import NavbarPage from './Navbar';
import LoadingScreen from './LoadingScreen';

export default class SubmittedAnswersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            setID: "",
            questions: [],
            answers: [],
            results: []
        };
    }


    isMissingProperty() {
        return this.props.location.state === undefined || 
        this.props.location.state.title === undefined ||
        this.props.location.state.setID === undefined ||
        this.props.location.state.questions === undefined ||
        this.props.location.state.results === undefined ||
        this.props.location.state.questions === undefined;
    }

    render() {
        if (this.isMissingProperty()) {
            return (
                <Redirect to="/"/>
            );
        }
        let results = this.props.location.state.results;
        let percentage = 100 * results.filter(Boolean).length / results.length;
        percentage = Math.floor(percentage);
        return (
            <AuthUserContext.Consumer> 
            { context => {
                let authUser = context.authUser;
                if (authUser) {
                    return (
                        <div>
                            <NavbarPage />
                            <main className="container">
                            <h2>{this.props.location.state.title}</h2>
                            {/* <Leaderboard /> */}
                            <p>Was Finished!</p>
                            <p>Final Score: {percentage}%</p>
                            <div className="d-flex justify-content-around">
                                <Link to={{
                                            pathname:"/answerset",
                                            search:"?setID=" + this.props.location.state.setID
                                        }}>
                                    <button type="button" className="btn btn-primary">Test Again</button>
                                </Link>
                                <Link to={{
                                    pathname:"/reviewset",
                                    state: {
                                        title: this.props.location.state.title,
                                        setID:  this.props.location.state.setID,
                                        questions:  this.props.location.state.questions,
                                        answers:  this.props.location.state.answers,
                                        results:  this.props.location.state.results
                                    }
                                }}>
                                    <button type="button" className="btn btn-primary">Review Missed Q's</button>
                                </Link>
                                <Link to="/createset">
                                    <button type="button" className="btn btn-primary">Create Your Own Problem Set</button>
                                </Link>
                            </div>
                        </main>
                     </div>
                    )
                } else if (!context.stateSet) {
                    return <LoadingScreen />;
                } else {
                    return <Redirect to="/"/>
                }
                }
            }
            </AuthUserContext.Consumer>
            
        )
    }
}