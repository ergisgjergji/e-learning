import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getCourseAssignments, getStudentAssignments, deleteAssignment } from './../../../redux/actions/assignmentActions';

import translate from './../../../i18n/translate';
import { injectIntl } from 'react-intl';

import { confirmAlert } from 'react-confirm-alert';
import { roles } from './../../../utils/constants';
import ReactTable from 'react-table-v6';
import AddAssignmentModal from './AddAssignmentModal';
import UploadSolutionModal from './UploadSolutionModal';

class AssignmentsTable extends Component {

    state = {
        filter: 'all'
    }

    componentDidMount() {
        const course_name = this.props.match.params.course_name;
        if(course_name)
            this.props.getCourseAssignments(course_name);
        else
            this.props.getStudentAssignments();
        
    }

    configureTable = (role, course_name) => {

        let teacher_config = [
            { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
            { Header: translate('assignment.name'), accessor: "name", sortable: true, style: { textAlign: "center" } },
            { Header: translate('file'), accessor: "fileName", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                const token = localStorage.getItem('token');
                const downloadUrl = props.original.downloadUrl + `&token=${token}`;
                return (
                    <a href={downloadUrl} target="_blank">
                        <i className="fa fa-download" aria-hidden="true"/> {props.original.fileName}
                    </a>
                )
            }},
            { Header: translate('due_date'), accessor: "due_date", sortable: true, filterable: true, style: { textAlign: "center" } },
            { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
                const { id } = props.original;
                return (
                    <div className="w-100 h-100">
                        <Link to={`/teacherPanel/course/${course_name}/assignments/${id}/solutions`} className="btn btn-sm btn-outline-primary shadow-sm mr-1 my-1">
                            <i className="fa fa-users" aria-hidden="true"> {translate('solutions')}</i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger shadow-sm my-1" onClick={this.onDeleteClick.bind(this, id)}>
                            <i className="fa fa-trash" aria-hidden="true"> {translate('delete')} </i>
                        </button>
                    </div>
                )
            }}
        ];
        
        let student_config;
        if(course_name)
            student_config = [
                { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
                { Header: translate('assignment.name'), accessor: "assignment_name", sortable: true, style: { textAlign: "center" } },
                { Header: translate('file'), accessor: "assignment_fileName", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                    const token = localStorage.getItem('token');
                    const downloadUrl = props.original.assignment_downloadUrl + `&token=${token}`;
                    return (
                        <a href={downloadUrl} target="_blank">
                            <i className="fa fa-download" aria-hidden="true"/> {props.original.assignment_fileName}
                        </a>
                    )
                }},
                { Header: translate('due_date'), accessor: "due_date", sortable: true, filterable: true, style: { textAlign: "center" } },
                { Header: translate('solution'), accessor: "file_name", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                    const token = localStorage.getItem('token');
                    const downloadUrl = props.original.download_url + `&token=${token}`;
                    return (
                        props.original.submitted ? 
                            <a href={downloadUrl} target="_blank">
                                <i className="fa fa-download" aria-hidden="true"/> {props.original.file_name}
                            </a> 
                            : 
                            "-"
                    )
                }},
                { Header: translate('submit_date'), accessor: "submit_date", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {
                    return props.original.submitted ? props.original.submit_date : "-";
                }},
                { Header: translate('status'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {

                    const { submitted, checked, passed } = props.original;
                    let statusMessage;
                    if(submitted === false)
                        statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('not-submitted')} </span>;
                    if(submitted === true && checked === false)
                        statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('submitted')} </span>;
                    if(submitted === true && checked === true && passed === true)
                        statusMessage = <span className="rounded bg-success text-white p-1"> {translate('pass')} </span>;
                    if(submitted === true && checked === true && passed === false)
                        statusMessage = <span className="rounded bg-danger text-white p-1"> {translate('fail')} </span>;
                    return statusMessage;
                }},
                { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
                    return <UploadSolutionModal solution={props.original} />;
                }}
            ];
        else
            student_config = [
                { Header: "Id", accessor: "id", sortable: false, show: false, filterable: false, style: { textAlign: "center" } },
                { Header: translate('course.name'), accessor: "course_name", sortable: true, filterable: true, style: { textAlign: "center" } },
                { Header: translate('assignment.name'), accessor: "assignment_name", sortable: true, style: { textAlign: "center" } },
                { Header: translate('file'), accessor: "assignment_fileName", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                    const token = localStorage.getItem('token');
                    const downloadUrl = props.original.assignment_downloadUrl + `&token=${token}`;
                    return (
                        <a href={downloadUrl} target="_blank">
                            <i className="fa fa-download" aria-hidden="true"/> {props.original.assignment_fileName}
                        </a>
                    )
                }},
                { Header: translate('due_date'), accessor: "due_date", sortable: true, filterable: true, style: { textAlign: "center" } },
                { Header: translate('solution'), accessor: "file_name", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {

                    const token = localStorage.getItem('token');
                    const downloadUrl = props.original.download_url + `&token=${token}`;
                    return (
                        props.original.submitted ? 
                            <a href={downloadUrl} target="_blank">
                                <i className="fa fa-download" aria-hidden="true"/> {props.original.file_name}
                            </a> 
                            : 
                            "-"
                    )
                }},
                { Header: translate('submit_date'), accessor: "submit_date", sortable: true, filterable: true, style: { textAlign: "center" }, Cell: props => {
                    return props.original.submitted ? props.original.submit_date : "-";
                }},
                { Header: translate('status'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {

                    const { submitted, checked, passed } = props.original;
                    let statusMessage;
                    if(submitted === false)
                        statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('not-submitted')} </span>;
                    if(submitted === true && checked === false)
                        statusMessage = <span className="bg-secondary rounded text-white p-1"> {translate('submitted')} </span>;
                    if(submitted === true && checked === true && passed === true)
                        statusMessage = <span className="rounded bg-success text-white p-1"> {translate('pass')} </span>;
                    if(submitted === true && checked === true && passed === false)
                        statusMessage = <span className="rounded bg-danger text-white p-1"> {translate('fail')} </span>;
                    return statusMessage;
                }},
                { Header: translate('action'), sortable: false, filterable: false, style: { textAlign: "center" }, Cell: props => {
                    return <UploadSolutionModal solution={props.original} />;
                }}
            ];

        if(role === roles.teacher)
            return teacher_config;
        else if(role === roles.student)
            return student_config;
    }

    onChange = (e) => {
        this.setState({ filter: e.target.value })
    }

    renderFilters = () => {
        const { intl } = this.props;
        const message1 = intl.formatMessage({ id: 'show-all' });
        const message2 = intl.formatMessage({ id: 'submitted' });
        const message3 = intl.formatMessage({ id: 'not-submitted' });
        return (
            <div className="text-right mb-1">
                <select className="btn btn-sm border-primary my-text-primary" onChange={this.onChange} value={this.state.filter}>
                    <option value="all"> {message1} </option>
                    <option value="submitted"> {message2} </option>
                    <option value="not-submitted"> {message3} </option>
                </select>
            </div> 
        )
    }
    
    applyFilters = () => {
        const { filter } = this.state;
        const { assignments } = this.props;
        let result;
        
        switch(filter) {
            case "all":
                result = assignments;
                break;
            case "submitted":
                result = assignments.filter(a => a.submitted === true);
                break;
            case "not-submitted":
                result = assignments.filter(a => a.submitted === false);
                break;
            default:
                result = assignments;
                break;
        }
        return result;
    }

    onDeleteClick = (assignment_id) => {
        const { course_name } = this.props.match.params;
        const { intl } = this.props;

        const confirm = intl.formatMessage({ id: 'confirm' });
        const confirmMessage = intl.formatMessage({ id: 'assignment.delete-confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });
        const notification_message = intl.formatMessage({ id: 'assignment.delete-notification'}, { id: assignment_id });

        confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.deleteAssignment(course_name, assignment_id, notification_message)
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {
        const { course_name } = this.props.match.params;
        const { loading, role } = this.props;
        const assignments = this.applyFilters();

        return (
            <div className="transition-page">
                <div className="page col-12 col-md-11 col-lg-9 p-1 mx-auto mt-2 mb-3">
                    
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/"> {translate('home')} </Link></BreadcrumbItem>
                        {
                            course_name ?
                                <>
                                    <BreadcrumbItem active> {course_name} </BreadcrumbItem>
                                    <BreadcrumbItem active> {translate('assignments')} </BreadcrumbItem>
                                </> : <BreadcrumbItem active> {translate('assignments')} </BreadcrumbItem>
                        }
                    </Breadcrumb>

                    { 
                        (role === roles.teacher) ? 
                            <AddAssignmentModal course_name={course_name} /> 
                            : 
                            this.renderFilters()
                    }

                    <ReactTable 
                        className="border rounded bg-white"
                        columns={this.configureTable(role, course_name)}
                        loading={loading}
                        data={assignments}
                        noDataText={translate('no-data')}
                        filterable
                        defaultPageSize={5}
                    />
                </div>
            </div>
        )
    }
}

AssignmentsTable.propTypes = {
    assignments: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    getCourseAssignments: PropTypes.func.isRequired,
    getStudentAssignments: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    assignments: state.assignmentStore.assignments,
    loading: state.assignmentStore.loading,
    role: state.authStore.user.role
});

export default connect(mapStateToProps, { getCourseAssignments, getStudentAssignments, deleteAssignment })(injectIntl(AssignmentsTable));
