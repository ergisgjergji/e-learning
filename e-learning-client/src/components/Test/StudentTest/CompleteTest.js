import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTestById, submitTest, asyncSubmit } from './../../../redux/actions/testActions';
import TestForm from './TestForm';

class CompleteTest extends Component {

    componentDidMount() {
        const { course_id, test_id } = this.props.match.params;
        this.props.getTestById(course_id, test_id, this.props.history);
    }

    render() {
        const { test } = this.props;
        const { course_id, test_id } = this.props.match.params;

        if(test.completed)
            return <Redirect to={`/studentPanel/course/${course_id}/test/${test_id}/details`}/>

        else
            return (
                <div className="transition-page">
                    <div className="container my-4">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">
                                {
                                    Object.keys(test).length ?
                                        <TestForm history={this.props.history} test={test} submitTest={this.props.submitTest} asyncSubmit={this.props.asyncSubmit}/>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

CompleteTest.propTypes = {
    test: PropTypes.object,
    getTestById: PropTypes.func.isRequired,
    submitTest: PropTypes.func.isRequired,
    asyncSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    test: state.testStore.current_test
});

export default connect(mapStateToProps, { getTestById, submitTest, asyncSubmit })(CompleteTest);
