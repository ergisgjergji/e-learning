import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import QuestionForm from './QuestionForm';

class TestForm extends Component {

    constructor() {
        super();

        this.state = {
            test: {},
            isBlocking: true
        }
        this.onWindowClose.bind(this);
        this.onCompleteQuestion.bind(this);
        this.onTestSubmit.bind(this);
    }
 
    componentDidMount() {
        // Submit the test if the windows is closed
        window.addEventListener("beforeunload", this.onWindowClose);
        // Submit the test every 5 minutes
        setInterval(this.submitInterval, 20000);

        const { test } = this.props;
        this.setState({ test });
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onWindowOut);
        clearInterval(this.submitInterval);

        const { test } = this.state;
        this.props.asyncSubmit(test);
    }

    onWindowClose = (e) => {
        const { test } = this.state;
        this.props.submitTest(test, this.props.history)
    }

    submitInterval = () => {
        const { test } = this.state;
        this.props.asyncSubmit(test)
    }

    onCompleteQuestion = (question_index, updatedAlternatives) => {

        const { test } = this.state;
        
        const updatedQuestions = test.questions.map((q, i) => i === question_index ? { ...q, alternatives: updatedAlternatives } : { ...q });
        test.questions = updatedQuestions;
        
        this.setState({ test });
    }

    onTestSubmit = () => {
        this.setState({ isBlocking: false })

        confirmAlert({
			title: 'Confirm',
			message: 'You are about to submit the test. Continue?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					onClick: () => {
                        const { test } = this.state;
                        this.props.submitTest(test, this.props.history)
                    }
				},
				{
					label: 'No',
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {

        const { test, isBlocking } = this.state;

        return (
            <div className="paper mt-4">
                <div className="px-4 mb-4 border">

                    <div className="text-center h5 m-4"><u>{test.header}</u></div>

                    <Prompt when={isBlocking} message={location => {
                            location.notification_message = "Test was submitted successfully.";
                            return "If you leave, the test will be submited. Continue?"
                        } 
                    } />

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
