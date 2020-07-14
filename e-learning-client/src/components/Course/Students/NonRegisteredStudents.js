import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNonRegisteredStudents, registerStudent } from './../../../redux/actions/courseActions';
import ReactTable from 'react-table-v6';
import { confirmAlert } from 'react-confirm-alert';

import translate from '../../../i18n/translate';
import { injectIntl } from 'react-intl';

class NonRegisteredStudents extends Component {

    componentDidMount() {
        const { course_id } = this.props;
        this.props.getNonRegisteredStudents(course_id);
    }

    onRegisterStudent = (course_id, student_id, name) => {

        const { intl } = this.props;
        const confirm = intl.formatMessage({ id: 'confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });
        const confirmMessage = intl.formatMessage({ id: 'register-student-confirm' }, { name });
        const notificationMessage = intl.formatMessage({ id: 'register-student-toast' }, { name });

        confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.registerStudent(course_id, student_id, notificationMessage)
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {
        const { course_id, students } = this.props;
        
        const columns = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
            { Header: translate('full-name'), accessor: "full_name", sortable: true, style: { textAlign: "center" } },
            { Header: translate('email'), accessor: "username", sortable: true, style: { textAlign: "center" } },
            { Header: translate('faculty'), accessor: "faculty", sortable: true, style: { textAlign: "center" } },
            { Header: translate('registration-date'), accessor: "registration_date", sortable: true, filterable: false, style: { textAlign: "center" } },
            { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
              return (
                <>
                    <button className="btn btn-sm my-btn-primary shadow" onClick={this.onRegisterStudent.bind(this, course_id, props.original.id, props.original.full_name)}>
                        {translate('register')} <i className="fa fa-registered" aria-hidden="true"/> 
                    </button>
                </>
              )
            }}
          ];

        return (
            <div className="my-4 border border-secondary rounded shadow-lg bg-white">
                <h3 className="text-center mt-4"> {translate('non-registered-students')} </h3>
                <br/>
                <ReactTable
                    columns={columns}
                    data={students}
                    noDataText={translate('no-data')}
                    filterable
                    defaultPageSize={10}
                />
            </div>
        );
    }
}

NonRegisteredStudents.propTypes = {
    students: PropTypes.array,
    getNonRegisteredStudents: PropTypes.func.isRequired,
    registerStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    students: state.courseStore.nonregistered_students
});

export default connect(mapStateToProps, { getNonRegisteredStudents, registerStudent })(injectIntl(NonRegisteredStudents));
