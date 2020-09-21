import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRegisteredStudents } from '../../../../redux/actions/courseActions';
import ReactTable from 'react-table-v6';

import translate from '../../../../i18n/translate';


class RegisteredStudents extends Component {

    componentDidMount() {
        const { course_id } = this.props;
        this.props.getRegisteredStudents(course_id);
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
                    <Link to={`/teacherPanel/course/${course_id}/student/${props.original.id}/results`} className="btn btn-sm my-btn-success shadow">
                        {translate('view-results')} <i className="fa fa-chevron-circle-right" aria-hidden="true"/>
                    </Link>
                </>
              )
            }}
          ];

        return (
            <div className="my-4 border border-secondary rounded shadow-lg bg-white">
                <h3 className="text-center mt-4"> {translate('registered-students')} </h3>
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

RegisteredStudents.propTypes = {
    students: PropTypes.array,
    getRegisteredStudents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    students: state.courseStore.registered_students,
});

export default connect(mapStateToProps, { getRegisteredStudents })(RegisteredStudents);
