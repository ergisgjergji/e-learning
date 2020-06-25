import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRegisteredStudents } from './../../../redux/actions/courseActions';

import ReactTable from 'react-table-v6';


class RegisteredStudents extends Component {

    componentDidMount() {
        const { course_id } = this.props;
        this.props.getRegisteredStudents(course_id);
    }

    render() {

        const { students } = this.props;
        
        const columns = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
            { Header: "Full name", accessor: "full_name", sortable: true, style: { textAlign: "center" } },
            { Header: "Username", accessor: "username", sortable: true, style: { textAlign: "center" } },
            { Header: "Faculty", accessor: "faculty", sortable: true, style: { textAlign: "center" }, width: 150 },
            { Header: "Registration Date", accessor: "registration_date", sortable: true, filterable: false, style: { textAlign: "center" }, width: 150 },
            { Header: "Action", sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
              return (
                <>
                    <Link to={`/adminPanel/updateUser/${props.original.id}`} className="btn btn-sm btn-outline-dark shadow-sm mr-2 my-1">Edit</Link>
                    <Link to={{ pathname: `/adminPanel/resetPassword/${props.original.id}`, fromRoute: "/adminPanel/students" }} className="btn btn-sm btn-secondary shadow-sm mr-2 my-1">
                        Reset password
                    </Link>
                </>
              )
            }}
          ];

        return (
            <div className="my-4 p-4 border border-secondary rounded shadow-lg">
                <h3 className="text-center">Registered students</h3>
                <br/>
                <ReactTable
                    columns={columns}
                    data={students}
                    noDataText={"No data"}
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
