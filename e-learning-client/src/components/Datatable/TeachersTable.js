import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeachers, deleteTeacher } from './../../redux/actions/userActions';
import ReactTable from 'react-table-v6';
import { confirmAlert } from 'react-confirm-alert';

import translate from '../../i18n/translate';

class TeachersTable extends Component {

    componentDidMount() {
        this.props.getTeachers();
    }

    onDeleteClick = (id) => {
        confirmAlert({
			title: 'Confirm',
			message: 'Are u sure u want to delete this teacher?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					onClick: () => this.props.deleteTeacher(id)
				},
				{
					label: 'No',
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {

        const { teachers } = this.props.userStore;
        
        const columns = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
            { Header: translate('full-name'), accessor: "full_name", sortable: true, style: { textAlign: "center" } },
            { Header: translate('email'), accessor: "username", sortable: true, style: { textAlign: "center" } },
            { Header: translate('faculty'), accessor: "faculty", sortable: true, style: { textAlign: "center" }, width: 140 },
            { Header: translate('registration-date'), accessor: "registration_date", sortable: true, filterable: false, style: { textAlign: "center" }, width: 140 },
            { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, width: 300, Cell: props => {
              return (
                <>
                    <Link to={`/adminPanel/updateUser/${props.original.id}`} className="btn btn-sm btn-outline-dark shadow-sm mr-1 my-1">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"/> {translate('edit')}
                    </Link>
                    <Link to={{ pathname: `/adminPanel/resetPassword/${props.original.id}`, fromRoute: "/adminPanel/teachers" }} className="btn btn-sm btn-secondary shadow-sm mr-1 my-1">
                        <i className="fa fa-key" aria-hidden="true"/> {translate('reset-password')}
                    </Link>
                    <button className="btn btn-sm btn-danger shadow-sm my-1" onClick={this.onDeleteClick.bind(this, props.original.id)}>
                        <i className="fa fa-trash" aria-hidden="true"/> {translate('delete')}
                    </button>
                </>
              )
            }}
          ];

        return (
            <div className="transition-page">
                <div className="col-12 col-md-11 col-lg-10 mx-auto p-3 my-4 border rounded shadow">
    
                    <h1 className="display-4 text-center"> {translate('teachers')} </h1>

                    <Link to="/adminPanel/addTeacher" className="btn bn-lg btn-primary">
                        <i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-teacher')}
                    </Link>
                    <br/><br/>
    
                    <ReactTable
                        columns={columns}
                        data={teachers}
                        noDataText={translate('no-data')}
                        filterable
                        defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }
}

TeachersTable.propTypes = {
    userStore: PropTypes.object.isRequired,
    getTeachers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userStore: state.userStore
});

export default connect(mapStateToProps, { getTeachers, deleteTeacher })(TeachersTable);
