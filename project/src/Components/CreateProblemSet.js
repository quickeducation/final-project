import React, { Component } from 'react';


export default class CreateProblemSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            questionAnswerPairs : [{question:"", answer:""}]
         };
    }

    addQuestion = () => {
        this.setState((prevState) => ({
            questionAnswerPairs: [...prevState.questionAnswerPairs, {question:"", answer:""}]
        }))
    }

    handleChange = (e) => {
        let pairs = [...this.state.questionAnswerPairs];
        
    }


    render() {
        return (
            <main className="container">
                <h2>Create A Problem Set</h2>
                <form id="set-form" onChange={this.handleChange}>
                    <div className="form-row form-group">
                        <div className="col">
                            <input type="text" id="title" className="form-control" placeholder="Problem Set Title" rows="2" maxLength="60"
                                accept-charset="UTF-8" />
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
                        <button type="submit" className="btn btn-success">Submit Set</button>
                    </div>
                </form>
            </main>
        );
    }
}

const QuestionAnswerInputs = (props) => {
    return (
        props.questionAnswerPairs.map((pair, index)=> {
            index++;
            let questionID = "question-" + index;
            let answerID = "answer-" + index;
            return (
                <div className="form-row form-group" key={index}>
                    <label className="col-form-label">{index}.)</label>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Question" rows="2" maxLength="120"
                            accept-charset="UTF-8" value={props.questionAnswerPairs[index - 1].question} name={questionID} id={questionID} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" rows="2" maxLength="120"
                            accept-charset="UTF-8" value={props.questionAnswerPairs[index - 1].answer} name={answerID} id={answerID} />
                    </div>
                </div>
            )
        })
    )
}