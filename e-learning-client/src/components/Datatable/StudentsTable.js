import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents, deleteStudent } from './../../redux/actions/userActions';

import ReactTable from 'react-table-v6';
import { confirmAlert } from 'react-confirm-alert';

class StudentsTable extends Component {

    componentDidMount() {
        this.props.getStudents();   
    }

    onDeleteClick = (id) => {

        confirmAlert({
			title: 'Confirm',
			message: 'Are u sure u want to delete this student?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					onClick: () => this.props.deleteStudent(id)
				},
				{
					label: 'No',
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {

        const { students } = this.props.userStore;
        
        const columns = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" }, width: 100 },
            { Header: "Full name", accessor: "full_name", sortable: true, style: { textAlign: "center" } },
            { Header: "Username", accessor: "username", sortable: true, style: { textAlign: "center" } },
            { Header: "Faculty", accessor: "faculty", sortable: true, style: { textAlign: "center" } },
            { Header: "Registration Date", accessor: "registration_date", sortable: true, filterable: false, style: { textAlign: "center" } },
            { Header: "Action", sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
              return (
                <>
                    <Link to={`/adminPanel/updateUser/${props.original.id}`} className="btn btn-sm btn-secondary shadow mr-2">Edit</Link>
                    <button className="btn btn-sm btn-danger shadow" onClick={this.onDeleteClick.bind(this, props.original.id)}>Delete</button>
                </>
              )
            }}
          ];

        return (
            <div className="col-11 col-md-11 col-lg-10 mx-auto p-4 my-4 border rounded shadow">
  
                <h1 className="display-4 text-center">Students</h1>
                <Link to="/adminPanel/addStudent" className="btn bn-lg btn-primary">Add student</Link>
                <br/><br/>
  
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

StudentsTable.propTypes = {
    userStore: PropTypes.object.isRequired,
    getStudents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userStore: state.userStore
});

export default connect(mapStateToProps, { getStudents, deleteStudent })(StudentsTable);