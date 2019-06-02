import React, {Component}  from 'react';
import { Link } from 'react-router-dom';


export default class ReviewSetPage extends Component {
    render() {
        let title = this.props.location.state.title;
        let answers = this.props.location.state.answers;
        let answeredCorrectly = this.props.location.state.results;
        let questions = this.props.location.state.questions;
        console.log(title)
        return (
            <main className="container">
                <h2>{title}</h2>
                {
                    answers.map((answer, index) => {
                        let question = questions[index];
                        let correct = answeredCorrectly[index];
                        let borderStyle = "col d-flex align-items-center justify-content-center";
                        let icon;
                        if (correct) {
                            borderStyle = borderStyle + " border border-success bg-success text-white"
                            icon = <img src="https://img.icons8.com/color/48/000000/checked.png" alt="checkmark"/>;
                        } else {
                            borderStyle = borderStyle + " border border-danger bg-danger text-white"
                            icon = <img src="https://img.icons8.com/color/48/000000/cancel.png" alt="X-Mark"/>;
                        }
                        let questionNumber = index + 1;
                        return (
                        <div className="form-row form-group" key={questionNumber}>
                            <label className="col-form-label">{questionNumber}.)</label>
                            <div className="col d-flex align-items-center justify-content-center">
                                <p className="m-0">{question}</p>
                            </div>
                            <div className={borderStyle}>
                                <p className="m-0">{answer}</p>
                            </div>
                            {icon}
                        </div>
                        );
                    })
                }
                <Link className="d-flex flex-row-reverse" to=
                    {{
                        pathname:"/answerset",
                        search:"?setID=" + this.props.location.state.setID
                    }}
                >
                        <button type="button" className="btn btn-success">Try Again!</button>
                </Link>
            </main>
        )
    }
}