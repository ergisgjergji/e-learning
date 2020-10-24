import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getAssignmentSolutions, gradeSolution } from './../../../redux/actions/assignmentActions';

import translate from './../../../i18n/translate';
import { injectIntl } from 'react-intl';

import { confirmAlert } from 'react-confirm-alert';
import ReactTable from 'react-table-v6';

class AssignmentSolutionsTable extends Component {

    state = {
    };

    componentDidMount() {
        const { assignment_id } = this.props.match.params;
        this.props.getAssignmentSolutions(assignment_id);
    }

    toggleTooltip = (target) => {
        this.setState({
            ...this.state,
            [target]: !this.state[target]
          });
    }

    onGradeSolutionClick = (solution_id) => {

        const { assignment_id } = this.props.match.params;
        const { intl } = this.props;

        const confirm = intl.formatMessage({ id: 'grade' });
        const confirmMessage = intl.formatMessage({ id: 'solution.grade-confirm' });
        const passBtn = intl.formatMessage({ id: 'pass' });
        const failBtn = intl.formatMessage({ id: 'fail' });
        const notification_message = intl.formatMessage({ id: 'solution.grade-notification'}, { id: assignment_id });

        const formData = new FormData();

        confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: passBtn,
					className: "confirm-yes",
					onClick: () => {
                        formData.append('passed', true);
                        this.props.gradeSolution(assignment_id, solution_id, formData, notification_message);
                    }
				},
				{
					label: failBtn,
                    className: "confirm-no",
                    onClick: () => {
                        formData.append('passed', false);
                        this.props.gradeSolution(assignment_id, solution_id, formData, notification_message);
                    }
			  	}
			]
		})
    }

    render() {
        const { course_name, assignment_id } = this.props.match.params;
        const { solutions, loading } = this.props;

        const table_config = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
            { Header: translate('student'), accessor: "student_name", sortable: true, style: { textAlign: "center" } },
            { Header: translate('file'), accessor: "fileName", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                const token = localStorage.getItem('token');
                const downloadUrl = props.original.downloadUrl + `&token=${token}`;
                return (
                    props.original.submitted ?
                        <a href={downloadUrl} target="_blank">
                            <i className="fa fa-download" aria-hidden="true"/> {props.original.file_name}
                        </a>
                        : "-"
                )
            }},
            { Header: translate('submit_date'), accessor: "submit_date", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {
                return props.original.submitted ? props.original.submit_date : "-"
            }},
            { Header: translate('status'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {

                const { submitted, checked, passed } = props.original;
                let statusMessage;
                if(submitted === false)
                    statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('not-submitted')} </span>;
                if(submitted === true && checked === false)
                    statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('submitted')} </span>;
                if(submitted === true && checked === true && passed === true)
                    statusMessage = <span className="rounded bg-success text-white px-2 py-1"> {translate('pass')} </span>;
                if(submitted === true && checked === true && passed === false)
                    statusMessage = <span className="rounded bg-danger text-white px-2 py-1"> {translate('fail')} </span>;
                return statusMessage;
            }},
            { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
                const { id, submitted, checked } = props.original;

                let disabled = false;
                if(submitted === false || (submitted === true && checked === true))
                    disabled = true;

                return (
                    <button disabled={disabled} className="btn btn-sm btn-outline-primary" onClick={this.onGradeSolutionClick.bind(this, props.original.id)}>
                        <i className="fa fa-upload" aria-hidden="true"/> {translate('grade')}
                    </button>
                )
            }}
        ];

        return (
            <div className="transition-page">
                <div className="page col-12 col-md-11 col-lg-9 p-1 mx-auto mt-2 mb-3">

                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/teacherPanel"> {translate('home')} </Link></BreadcrumbItem>
                        <BreadcrumbItem active> {course_name} </BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/teacherPanel/course/${course_name}/assignments`}> {translate('assignments')} </Link></BreadcrumbItem>
                        <BreadcrumbItem active> {assignment_id} </BreadcrumbItem>
                        <BreadcrumbItem active> {translate('solutions')} </BreadcrumbItem>
                    </Breadcrumb>

                    <ReactTable 
                        className="border rounded bg-white"
                        columns={table_config}
                        loading={loading}
                        data={solutions}
                        noDataText={translate('no-data')}
                        filterable
                        defaultPageSize={5}
                    />
                </div>
            </div>
        )
    }
}

AssignmentSolutionsTable.propTypes = {
    solutions: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    getAssignmentSolutions: PropTypes.func.isRequired,
    gradeSolution: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    solutions: state.assignmentStore.solutions,
    loading: state.assignmentStore.loading
});

export default connect(mapStateToProps, { getAssignmentSolutions, gradeSolution })(injectIntl(AssignmentSolutionsTable));
