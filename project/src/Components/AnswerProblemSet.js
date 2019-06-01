import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Link } from 'react-router-dom';

class AnswerProblemSetPage extends Component {
    render() {
        let setID = this.getQueryStringParams(this.props.location.search).setID;
        return (
            <main className="container">
                <AnswerProblemSet setID={setID}/>
            </main>
        )
    }

    // Splits the queries of a uri into each query and decodes their values 
    getQueryStringParams = query => {
        return query
            ? (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params, param) => {
                        let [key, value] = param.split('=');
                        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                        return params;
                    }, {}
                )
            : {}
    };
}

class AnswerProblemSetBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            questions : [],
            answers: [],
            isLoading: true,
            error:null,
            reviewing:false,
            results:[]
        };
    }

    componentDidMount() {
        Promise.all(this.props.firebase.getTitleAndQuestions(this.props.setID))
        .then((response) => {
            let answers = Array(response[1].length).fill('');
            this.setState(({
                title:response[0],
                questions:response[1],
                answers: answers,
                isLoading: false
            }));
        })
        .catch(error => console.log(error));
    }

    handleChange = (e) => {
        let oldAnswers = this.state.answers;
        oldAnswers[e.target.dataset.id] = e.target.value;
        this.setState({answers:oldAnswers});
    }

    submitAnswers = (e) => {
        e.preventDefault();
        let answers = this.state.answers;
        this.setState({isLoading:true})
        for (let i = 0; i < answers.length; i++) {
            if (!this.isValidInput(answers[i])) {
                alert("Question " + (i + 1) + "'s length is invalid.");
                return;
            }
        }
        this.props.firebase.validateAnswers(answers, this.props.setID)
        .then((response) => {
            this.setState({isLoading:false, results: response.correctAnswers})
            console.log('Success: ', response.correctAnswers);
        })
        .catch((error) => {
            this.setState({isLoading:false, error:error})
            console.log('Error:', error)
        })
    }

    isValidInput = (input) => {
        return input.length > 0 && input.length <= 120;
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else if (this.state.error) {
            return (
                <div>
                    <h2>Uh oh you ran into an error</h2>
                    <p>{this.state.error}</p>
                </div>
            );
        } else if (this.state.reviewing) {
            return (
                <ReviewPage theirAnswers={this.state.answers} questions={this.state.questions}
                answeredCorrectly={this.state.results} title={this.state.title}/>
            );
        } else if (this.state.results.length !== 0) {
            let results = this.state.results;
            let percentage = 100 * results.filter(Boolean).length / results.length;
            percentage = Math.floor(percentage);
            return (
                <FinishedProblemSetPage percentage={this.percentage} setID={this.state.setID} />
            )
        }
        return (
            <div>
                <h2>{this.state.title}</h2>
                <form id="set-form" acceptCharset="UTF-8" onChange={this.handleChange}>
                    <QuestionsAndAnswerInputs answers={this.state.answers} questions={this.state.questions} />
                    <div className="form-row d-flex flex-row-reverse">
                        <button type="submit" className="btn btn-success" onClick={this.submitAnswers}>Submit Answers</button>
                    </div>
                </form>
            </div>
        )
    }
}

const ReviewPage = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            {
                props.theirAnswers.map((answer, index) => {
                    let question = props.questions[index];
                    let correct = props.answeredCorrectly[index];
                    let borderStyle = "col d-flex align-items-center justify-content-center";
                    if (correct) {
                        borderStyle = borderStyle + "border border-success"
                    } else {
                        borderStyle = borderStyle + "border border-danger"
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
                    </div>
                    );
                })
            }
        </div>
    )
}

const FinishedProblemSetPage = (props) => {

}

const QuestionsAndAnswerInputs = (props) => {
    return (
        props.answers.map((answer, index)=> {
            let questionNumber = index + 1;
            let answerID = "answer-" + questionNumber;
            return (
                <div className="form-row form-group" key={questionNumber}>
                    <label className="col-form-label">{questionNumber}.)</label>
                    <div className="col d-flex align-items-center justify-content-center">
                        <p className="m-0 question">{props.questions[index]}</p>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" rows="2" maxLength="120"
                            defaultValue={answer} 
                            data-id={index} name={answerID} id={answerID} />
                    </div>
                </div>
            )
        })
    )
}


const AnswerProblemSet = withFirebase(AnswerProblemSetBase);

export default AnswerProblemSetPage;