import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourse } from './../../../redux/actions/courseActions';
import { confirmAlert } from 'react-confirm-alert';
import { injectIntl } from 'react-intl';
import translate from '../../../i18n/translate';

class TeacherCourseMenu extends Component {

    onDeleteClick = (id) => {

		const { intl } = this.props;
		const confirm = intl.formatMessage({ id: 'confirm' });
		const yes = intl.formatMessage({ id: 'yes' });
		const no = intl.formatMessage({ id: 'no' });
		const confirmMessage = intl.formatMessage({ id: 'delete-course-confirm' });
		const notificationMessage = intl.formatMessage({ id: 'delete-course-toast' }, { id });
        
		confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.deleteCourse(id, notificationMessage)
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }
    
    render() {
        const { id, course_name } = this.props;
        return (
            <>
                <Link to={`/teacherPanel/updateCourse/${id}`}>
                    <li className="list-group-item update">
                        <i className="fa fa-edit pr-1"> {translate('update-course')} </i>
                    </li>
                </Link>

                <Link to={`/teacherPanel/course/${course_name}/lectures`}>
                    <li className="list-group-item update">
                        <i className="fa fa-folder-open-o pr-1"> {translate('manage-lectures')} </i>
                    </li>
                </Link>

                <Link to={`/teacherPanel/course/${id}/students`}>
                    <li className="list-group-item board">
                        <i className="fa fa-users pr-1"> {translate('manage-students')} </i>
                    </li>
                </Link>

                <Link to={`/teacherPanel/course/${id}/tests`}>
                    <li className="list-group-item board">
                        <i className="fa fa-file-text-o pr-1"> {translate('manage-tests')} </i>
                    </li>
                </Link>

                <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, id)}>
                    <i className="fa fa-trash-o pr-1"> {translate('delete-course')} </i>
                </li>
            </>
        )
    }
}

TeacherCourseMenu.propTypes = {
    deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(null, { deleteCourse })(injectIntl(TeacherCourseMenu));