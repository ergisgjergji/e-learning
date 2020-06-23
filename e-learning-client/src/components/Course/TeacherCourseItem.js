import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { deleteCourse } from './../../redux/actions/courseActions';

class TeacherCourseItem extends Component {

	onDeleteClick = (id) => {

		confirmAlert({
			title: 'Confirm',
			message: 'Are u sure u want to delete this course?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					// onClick: () => this.props.deleteCourse(id)
				},
				{
					label: 'No',
					className: "confirm-no"
			  	}
			]
		})
	}

	render() {
		const { course } = this.props;

		return (
			<div className="container rounded">
				<div className="card card-body bg-light mb-3 border border-secondary">

					<div className="row pb-4">
						<div className="col-4 col-md-3 border-right">
                            <h5>Name:</h5>
							<span className="mx-auto"> #{course.name} </span>
						</div>

						<div className="col-md-4 col-8 border-right">
							<h5>Description:</h5>
							<p>{course.description}</p>
						</div>

						<div className="col-md-5 d-lg-block">
							<ul className="list-group shadow-lg">

								<Link to={`/teacherPanel/updateCourse/${course.id}`}>
									<li className="list-group-item board">
										<i className="fa fa-edit pr-1"> Update course </i>
									</li>
								</Link>

								<Link to={`/teacherPanel/course/${course.id}/students`}>
									<li className="list-group-item update">
										<i className="fa fa-graduation-cap pr-1"> Students </i>
									</li>
								</Link>

                                <Link to={`/teacherPanel/course/${course.id}/tests`}>
									<li className="list-group-item update">
										<i className="fa fa-file-text-o pr-1"> Tests </i>
									</li>
								</Link>

								<li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, course.id)}>
									<i className="fa fa-trash-o pr-1"> Delete Course</i>
								</li>
								
							</ul>
						</div>
					</div>

                    <div className="date-info d-flex flex-column my-2 pr-1 border-dark">
                        <span>
                            <b>Created:</b> {course.created_date}
                        </span>
                        <span>
                            <b>Last updated:</b> {course.updated_date}
                        </span>
                    </div>

				</div>
			</div>
		);
	}
}

TeacherCourseItem.propTypes = {
    // deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(null, { })(TeacherCourseItem);