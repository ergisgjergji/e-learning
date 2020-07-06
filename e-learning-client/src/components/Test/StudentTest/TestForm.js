import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import Countdown from 'react-countdown';

import QuestionForm from './QuestionForm';

class TestForm extends Component {

    constructor() {
        super();

        this.state = {
            test: {},
            duration: 10000,
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
        setInterval(this.submitInterval, 120000);

        const { test } = this.props;
        const duration = test.questions.length * 3 * 60 * 1000; // 3 minutes for each question
        this.setState({ test, duration });
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onWindowClose);
        clearInterval(this.submitInterval);

        const { test } = this.state;
        this.props.submitTest(test, this.props.history);
    }

    onWindowClose = (e) => {
        e.preventDefault();
        
        const { test } = this.state;
        this.props.asyncSubmit(test);
        
        return e.returnValue = "If you close the window, the test will be submitted.\nAre you sure you want to continue?"; 
    }

    submitInterval = () => {
        const { test } = this.state;
        this.props.asyncSubmit(test)
    }

    countdownRender = ({ hours, minutes, seconds, completed }) => {

        if (completed) {
            return (
                <div className="countdown-area d-inline-block font-weight-bold">
                    <span> Time is over </span>
                </div>  
            )
        } 
        else {
            return (
                <div className="countdown-area d-inline-block font-weight-bold">
                    <span> {hours}:{minutes}:{seconds} </span>
                </div>      
            )
        }
    };

    onCountdownComplete = () => {
        window.removeEventListener("beforeunload", this.onWindowClose);
        clearInterval(this.submitInterval);
        this.setState({ isBlocking: false });

        const { test } = this.state;
        this.props.submitTest(test, this.props.history);
    }

    onCompleteQuestion = (question_index, updatedAlternatives) => {
        
        const { test } = this.state;
        
        const updatedQuestions = test.questions.map((q, i) => i === question_index ? { ...q, alternatives: updatedAlternatives } : { ...q });
        test.questions = updatedQuestions;
        
        this.setState({ test });
    }

    onTestSubmit = () => {

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

        const { test, duration, isBlocking } = this.state;

        return (
            <div className="paper">
                <div className="px-3 mb-4 border">

                    <Prompt when={isBlocking} message={location => {
                                    return "If you leave, the test will be submited. Continue?"
                                }
                    }/>  

                    <div className="text-center h5 m-4"> {test.header} </div>
                    <div className="text-center text-muted font-weight-light font-italic small">
                        Time remaining: &nbsp;
                        <Countdown 
                            date={Date.now() + duration} 
                            renderer={this.countdownRender}
                            onComplete={this.onCountdownComplete}
                        />  
                    </div>             

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

                    <div className="col-12 ml-4 mt-3 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i>The minimal passing score is 40%</i>
                        </span>
                    </div>
                    <div className="col-12 ml-4 m-0 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i>Each question takes up to 3 minutes</i>
                        </span>
                    </div> 
                    <div className="col-12 ml-4 mb-2 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i>When the time is over it will be submited automatically</i>
                        </span>
                    </div> 

                </div>
            </div>
        )
    }
}

export default TestForm;
