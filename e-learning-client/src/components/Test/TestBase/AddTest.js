import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourseById } from '../../../redux/actions/courseActions';
import { addTest } from '../../../redux/actions/testActions';

import { Tooltip } from 'reactstrap';
import QuestionBaseItem from './QuestionBaseItem';
import AddQuestion from './AddQuestion';

import { toast } from 'react-toastify';

import translate from '../../../i18n/translate';
import { FormattedMessage, injectIntl } from 'react-intl';

class AddTest extends Component {

    constructor(){
        super();

        this.state = {
            id: "",
            fromRoute: "",
            isBlocking: true,
            header: "",
            questions: [],
            toggleForm: false,
            toggleTooltip: false,
            minimal_question_number: 4
        }
        this.onChange.bind(this);
        this.addQuestion.bind(this);
        this.onTestSubmit.bind(this);
        this.onToggleTooltip.bind(this);
        this.onToggleForm.bind(this);
    }

    componentDidMount() {

        const { id } = this.props.match.params;
        const { fromRoute } = this.props.history.location;
        // Checks if course with 'id' exists
        this.props.getCourseById(id, this.props.history);
        this.setState({ id, fromRoute });
    }

    onToggleTooltip = () => {
        this.setState({ toggleTooltip: !this.state.toggleTooltip });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, isBlocking: true });
    }

    onToggleForm = () => {
        this.setState({ toggleForm: !this.state.toggleForm });
    }

    addQuestion = (newQuestion) => {

        let questions = this.state.questions;
        questions.push(newQuestion);
        this.setState({ questions, toggleForm: false, isBlocking: true })
    }

    onTestSubmit = (e) => {
        e.preventDefault();
        toast.configure();

        const { id, fromRoute, header, questions, toggleForm, minimal_question_number } = this.state;
        const { intl } = this.props;
        const questionFormMessage = intl.formatMessage({ id: 'question-form-toast' });
        const questionNumberMessage = intl.formatMessage({id: 'question-number-toast'}, { number: minimal_question_number});
        const notificationMessage = intl.formatMessage({ id: 'add-test-toast' });

        if(toggleForm) 
            toast.warn(questionFormMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });

        else {
            const test = { header, questions };

            if(questions.length < minimal_question_number)
                toast.warn(questionNumberMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });

            else {
                this.setState({ isBlocking: false })
                this.props.addTest(id, test, fromRoute, this.props.history, notificationMessage);
            }
        }
    }

    render() {

        const { header, questions, toggleForm, toggleTooltip, isBlocking } = this.state;

        return (
            <div className="transition-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">

                        <FormattedMessage id="add-test-leaving">
                            { (msg) => <Prompt when={isBlocking} message={location => msg.toString()}/> }
                        </FormattedMessage>
                            

                            <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                            </button>

                            <div className="text-center h3"> {translate('new-test')} </div>
                            <hr/>

                            <form onSubmit={this.onTestSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="header"> {translate('header')} </label>
                                        <input id="header" name="header" required 
                                            className="form-control form-control-sm shadow-sm"
                                            value={header} onChange={this.onChange}/>
                                    </div>

                                    <div className="w-100 text-center h5 mx-auto mt-4">
                                        {translate('questions')}
                                    </div>

                                    {
                                        questions.map((question, index) => {
                                            return <QuestionBaseItem key={index} question={question}/>
                                        })
                                    }

                                    {
                                        toggleForm ? <AddQuestion addQuestion={this.addQuestion}/> : null
                                    }

                                    <div className="col-md-12 text-center">
                                        {
                                            toggleForm ?
                                                (<>
                                                    <button type="button" id="tooltip" className="btn btn-sm btn-outline-danger mt-3 mb-4 ml-auto shadow" onClick={this.onToggleForm}>X</button>
                                                    <Tooltip placement="right" isOpen={toggleTooltip} target="tooltip" toggle={this.onToggleTooltip}>
                                                        {translate('cancel')}
                                                    </Tooltip>
                                                </>)
                                                :
                                                (<>
                                                    <button type="button" id="tooltip" className="btn btn-sm btn-outline-dark mt-3 mb-4 mx-auto shadow" onClick={this.onToggleForm}>+</button>
                                                    <Tooltip placement="right" isOpen={toggleTooltip} target="tooltip" toggle={this.onToggleTooltip}>
                                                        {translate('add-question')}
                                                    </Tooltip>
                                                </>)

                                        }
                                    </div>
                                    
                                    <button type="submit" className="btn btn-lg my-btn-outline-success mt-0 mx-auto shadow" value="Save test">
                                        <i className="fa fa-floppy-o" aria-hidden="true"/> {translate('save')}
                                    </button>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


AddTest.propTypes = {
    getCourseById: PropTypes.func.isRequired,
    addTest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(null, { getCourseById, addTest })(injectIntl(AddTest));