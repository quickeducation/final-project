import React, { Component } from 'react';
import { withFirebase } from './Firebase';

const CreateProblemSetPage = () => (
    <main className="container">
                <h2>Create A Problem Set</h2>
                <CreateProblemSet />
    </main>
)

class CreateProblemSetBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            questionAnswerPairs : [{Question:"", Answer:""}]
         };
    }

    addQuestion = () => {
        this.setState((prevState) => ({
            questionAnswerPairs: [...prevState.questionAnswerPairs, {Question:"", Answer:""}]
        }))
    }

    handleChange = (e) => {
        if (e.target.id === "title") {
            this.setState({title:e.target.value})
        } else {
            let pairs = [...this.state.questionAnswerPairs];
            pairs[e.target.dataset.id][e.target.placeholder] = e.target.value;
            this.setState({pairs});
        }
    }

    submitSet = (e) => {
        e.preventDefault();
        if (!this.isValidInput(this.state.title)) {
            if (this.state.title.length === 0) {
                alert("A title for the problem set is required.");
            } else {
                alert("Title length is too long.");
            }
            return;
        }
        let questions = [];
        let answers = [];
        for (let index = 0; index < this.state.questionAnswerPairs.length; index++) {
            const qAPair = this.state.questionAnswerPairs[index];
            if (!this.isValidInput(qAPair.Question)) {
                alert("Question " + (index + 1) + "'s length  is invalid.")
                return;
            } else if (!this.isValidInput(qAPair.Answer)) {
                alert("Answer " + (index + 1) + "'s length  is invalid.")
                return;
            } else {
                questions.push(qAPair.Question);
                answers.push(qAPair.Answer);
            }
        }
        const setJSON = this.createSetJSON(this.state.title, questions, answers);
        this.props.firebase.addProblemSet(setJSON).then(() => console.log("set added."));
    }

    createSetJSON = (title, questions, answers) => {
        let currentUser = this.props.firebase.auth.currentUser;
        let author = currentUser.email;
        let uid = currentUser.uid;
        if (!author) {
          author = "Anonymous";
          uid = "Anonymous"
        }
        let json = { author: author, body:{answers: answers, questions: questions},
                    title: title, uid: uid, length: questions.length };
        return json;
      }

    isValidInput = (input) => {
        return input.length <= 120 && input.length > 0;
    }

    render() {

        return (
            <form id="set-form" onChange={this.handleChange}>
                <div className="form-row form-group">
                    <div className="col">
                        <input type="text" id="title" className="form-control" placeholder="Problem Set Title" rows="2" maxLength="60"
                            acceptCharset="UTF-8" />
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <label>Questions:</label>
                    <label>Answers:</label>
                </div>
                <QuestionAnswerInputs questionAnswerPairs={this.state.questionAnswerPairs}/>
                <div className="form-row">
                    <button type="button" onClick={this.addQuestion} id="add-question" className="btn btn-primary">New Question</button>
                </div>
                <div className="form-row d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-success" onClick={this.submitSet}>Submit Set</button>
                </div>
            </form>
        );
    }
}

const QuestionAnswerInputs = (props) => {
    return (
        props.questionAnswerPairs.map((pair, index)=> {
            let questionNumber = index + 1;
            let questionID = "question-" + questionNumber;
            let answerID = "answer-" + questionNumber;
            return (
                <div className="form-row form-group" key={questionNumber}>
                    <label className="col-form-label">{questionNumber}.)</label>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Question" rows="2" maxLength="120"
                            acceptCharset="UTF-8" value={props.questionAnswerPairs[index].question} 
                            data-id={index} name={questionID} id={questionID} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" rows="2" maxLength="120"
                            acceptCharset="UTF-8" value={props.questionAnswerPairs[index].answer} 
                            data-id={index} name={answerID} id={answerID} />
                    </div>
                </div>
            )
        })
    )
}

const CreateProblemSet = withFirebase(CreateProblemSetBase);

export default CreateProblemSetPage