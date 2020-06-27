import React, { Component } from 'react';
import QuestionForm from './QuestionForm';

class TestForm extends Component {

    constructor() {
        super();

        this.state = {
            test: {}
        }
        this.onCompleteQuestion.bind(this);
        this.onTestSubmit.bind(this);
    }

    componentDidMount() {
        const { test } = this.props;
        this.setState({ test });
    }

    onCompleteQuestion = (question_index, updatedAlternatives) => {

        const { test } = this.state;
        
        const updatedQuestions = test.questions.map((q, i) => i === question_index ? { ...q, alternatives: updatedAlternatives } : { ...q });
        test.questions = updatedQuestions;
        
        this.setState({ test });
    }

    onTestSubmit = () => {
        const { test } = this.state;
        console.log(test);
        // call action to save test
    }

    render() {

        const { test } = this.state;
        return (
            <div className="paper mt-4">
                <div className="px-4 mb-4 border">

                    <div className="text-center h5 m-4"><u>{test.header}</u></div>

                    {
                        Object.keys(test).length ?
                            test.questions.map((question, index) => {
                                return <QuestionForm key={index} question={question} index={index} onCompleteQuestion={this.onCompleteQuestion}/>
                            })
                            : null
                    }

                    <div className="row">
                        <button type="button" className="btn btn-md btn-primary border border-dark text-dark mx-auto mt-5 shadow" onClick={this.onTestSubmit}>
                            <i className="fa fa-floppy-o" aria-hidden="true"/> Submit test
                        </button>
                    </div>

                    <div className="col-12 my-2 p-0 text-secondary text-center">
                        <small>
                            * Note: <i>The minimal passing score is 40%</i>
                        </small>
                    </div>   

                </div>
            </div>
        )
    }
}

export default TestForm;
