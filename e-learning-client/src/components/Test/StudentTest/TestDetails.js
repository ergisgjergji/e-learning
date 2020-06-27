import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTestById } from './../../../redux/actions/testActions';
import TestResultPaper from './../TestResult/TestResultPaper';

class TestDetails extends Component {

    componentDidMount() {

        const { course_id, test_id } = this.props.match.params;
        this.props.getTestById(course_id, test_id, this.props.history);
    }

    render() {

        const { current_test } = this.props.testStore;
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">

                        <button className="btn btn-secondary btn-sm shadow mb-3" onClick={() => this.props.history.goBack()}> 
                            <i className="fa fa-arrow-left" aria-hidden="true"/> Go back
                        </button>

                        {
                            Object.keys(current_test).length ?
                                <TestResultPaper test={current_test}/>
                                : null
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

TestDetails.propTypes = {
    testStore: PropTypes.object.isRequired,
    getTestById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    testStore: state.testStore
});

export default connect(mapStateToProps, { getTestById })(TestDetails);
