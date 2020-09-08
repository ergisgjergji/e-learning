import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import Countdown from 'react-countdown';
import QuestionForm from './QuestionForm';

import translate from '../../../i18n/translate';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';

// ToDo: Pass the CountDown to the parent component and pass it down here as a prop. This way, no matter how many times this component
// re-renders, the countdown will never be delayed.

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
        // Submit the test every 2 minutes
        setInterval(this.submitInterval, 120000);

        const { test } = this.props;
        const duration = test.questions.length * 3 * 60 * 1000; // 3 minutes for each question
        this.setState({ test, duration });
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onWindowClose);
        clearInterval(this.submitInterval);

        const { test } = this.state;
        this.props.asyncSubmit(test, this.props.history);
    }

    onWindowClose = (e) => {
        e.preventDefault();
        
        const { test } = this.state;
        this.props.asyncSubmit(test);
        
        return e.returnValue = "If you close the window, the test will be submitted. Are you sure you want to continue?"; 
    }

    onRouteChange = () => {

        const { intl } = this.props;
        const blockingMessage = intl.formatMessage({ id: 'blocking-route-toast' });

        toast.configure();
        toast.warn(blockingMessage, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        });
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

    onClockTick = (clock) => {
        this.setState({ duration: clock.total });
    }

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

        const { intl } = this.props;
        const confirm = intl.formatMessage({ id: 'confirm' });
        const confirmMessage = intl.formatMessage({ id: 'submit-test-confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });
        const notificationMessage = intl.formatMessage({ id: 'submit-test-toast' });

        confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => {
                        this.setState({ isBlocking: false });
                        const { test } = this.state;
                        this.props.submitTest(test, this.props.history, notificationMessage)
                    }
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {

        const { test, duration, isBlocking } = this.state;
        const { intl } = this.props;

        return (
            <div className="paper">
                <div className="px-3 mb-4 border">

                    <Prompt when={isBlocking} message={location => {
                                    this.onRouteChange();
                                    return false;
                                }
                    }/>  

                    <div className="text-center h5 m-4 pt-2"> {test.header} </div>
                    <div className="mb-2 text-center text-muted font-weight-light font-italic small">
                        {translate('time-remaining')}: &nbsp;
                        <Countdown 
                            date={Date.now() + duration} 
                            renderer={this.countdownRender}
                            onTick={this.onClockTick}
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
                        <button id="submitTestBtn" type="button" className="btn btn-md btn-primary border border-dark text-dark mx-auto mt-5 shadow" onClick={this.onTestSubmit}>
                            <i className="fa fa-floppy-o" aria-hidden="true"/> {translate('submit-test')}
                        </button>
                    </div>

                    <div className="col-12 ml-4 mt-3 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i> {translate('minimal-score')} </i>
                        </span>
                    </div>
                    <div className="col-12 ml-4 m-0 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i> {translate('question-duration')} </i>
                        </span>
                    </div> 
                    <div className="col-12 ml-4 mb-2 p-0 text-muted text-left font-weight-light small">
                        <span>
                            * <i> {translate('countdown-end')} </i>
                        </span>
                    </div> 

                </div>
            </div>
        )
    }
}

export default injectIntl(TestForm);
