import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourseById } from '../../../redux/actions/courseActions';
import { getTestBaseList } from '../../../redux/actions/testActions';

import { Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import TestBaseItem from './TestBaseItem';

import translate from '../../../i18n/translate';

class TestBaseList extends Component {

    componentDidMount() {

        const { id } = this.props.match.params;
        // Perform this to check if course with 'id' exists
        this.props.getCourseById(id, this.props.history);
		this.props.getTestBaseList(id);

		if(this.props.location.notification_message) {
			toast.dismiss();
			toast.success(`ℹ ${this.props.location.notification_message}`)
		}
	}

    render() {
        const { id } = this.props.match.params;
        const { tests } = this.props;

        return (
            <div className="transition-page">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">

                            <h1 className="display-4 text-center my-3"> {translate('tests')} </h1>

                            <Link to={{ pathname: `/teacherPanel/course/${id}/addTest`, fromRoute: `/teacherPanel/course/${id}/tests` }} className="btn btn-md btn-primary shadow mb-4">
                                <i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-test')}
                            </Link>

                            {
                                (tests.length === 0) ?
                                    <Alert color="info" className="text-center">
                                        <i className="fa fa-info-circle" aria-hidden="true"/> {translate('TestBaseList-empty')}
                                    </Alert>
                                    :
                                    tests.map((test, index) => {
                                        return <TestBaseItem key={index} test={test}/>
                                    })
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TestBaseList.propTypes = {
    getCourseById: PropTypes.func.isRequired,
    getTestBaseList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tests: state.testStore.testbase_list
});

export default connect(mapStateToProps, { getCourseById, getTestBaseList })(TestBaseList);