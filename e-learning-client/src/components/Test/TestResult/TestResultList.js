import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentCompletedTests } from '../../../redux/actions/testActions';

import { Alert } from 'reactstrap';
import { toast } from 'react-toastify';

class TestResultList extends Component {

    componentDidMount() {

        const { course_id, student_id } = this.props.match.params;
        // Perform this to check if course with 'id' exists
        this.props.getStudentCompletedTests(course_id, student_id, this.props.history);

		if(this.props.location.notification_message) {
			toast.dismiss();
			toast.success(`ℹ ${this.props.location.notification_message}`)
		}
	}

    render() {
        const { tests } = this.props;

        return (
            <div className="container mt-4">
                <div className="row">

                    <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">

                        <button className="btn btn-secondary btn-sm shadow" onClick={() => this.props.history.goBack()}> 
                            <i className="fa fa-arrow-left" aria-hidden="true"/> Go back
                        </button>

                        <h1 className="display-4 text-center mb-4">Test Results</h1>

                        {
                            (tests.length === 0) ?
                                <Alert color="info" className="text-center">
                                    This student has no completed tests.
                                </Alert>
                                :
                                tests.map((test, index) => {
                                    return <></>
                                })
                        }

                    </div>

                </div>
            </div>
        )
    }
}

TestResultList.propTypes = {
    tests: PropTypes.array,
    getStudentCompletedTests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tests: state.testStore.student_completed_tests
});

export default connect(mapStateToProps, { getStudentCompletedTests })(TestResultList);