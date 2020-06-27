import React, { Component } from 'react';
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
        
        return (
            <div className="container mt-4">
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
    test: state.testStore.complete_test
});

export default connect(mapStateToProps, { getTestById, submitTest, asyncSubmit })(CompleteTest);
