import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourse } from './../../redux/actions/courseActions';
import { confirmAlert } from 'react-confirm-alert';

import translate from "../../i18n/translate";
import { injectIntl } from 'react-intl';

class TeacherCourseItem extends Component {

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
		const { course } = this.props;

		return (
			<div className="rounded">
				<div className="card card-body bg-light mb-3 border border-secondary">

					<div className="row pb-4">
						
						<div className="col-12 col-md-3 border-right mb-3">
                            <h5> {translate('name')}: </h5>
							<span className="mx-auto"> #{course.name} </span>
						</div>

						<div className="col-12 col-md-4 col-8 border-right">
							<h5> {translate('description')}: </h5>
							<p>{course.description}</p>
						</div>

						<div className="col-12 col-md-5">
							<ul className="list-group shadow-lg">

								<Link to={`/teacherPanel/updateCourse/${course.id}`}>
									<li className="list-group-item update">
										<i className="fa fa-edit pr-1"> {translate('update-course')} </i>
									</li>
								</Link>

								<Link to={`/teacherPanel/course/${course.id}/students`}>
									<li className="list-group-item board">
										<i className="fa fa-users pr-1"> {translate('manage-students')} </i>
									</li>
								</Link>

                                <Link to={`/teacherPanel/course/${course.id}/tests`}>
									<li className="list-group-item board">
										<i className="fa fa-file-text-o pr-1"> {translate('manage-tests')} </i>
									</li>
								</Link>

								<li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, course.id)}>
									<i className="fa fa-trash-o pr-1"> {translate('delete-course')} </i>
								</li>
								
							</ul>
						</div>
					</div>

                    <div className="date-info d-flex flex-column my-2 pr-1 border-dark">
                        <span>
                            <b> {translate('created')}:</b> {course.created_date}
                        </span>
                        <span>
                            <b> {translate('updated')}:</b> {course.updated_date}
                        </span>
                    </div>

				</div>
			</div>
		);
	}
}

TeacherCourseItem.propTypes = {
    deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(null, { deleteCourse })(injectIntl(TeacherCourseItem));