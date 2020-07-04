import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';

import { Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import TeacherCourseItem from './../Course/TeacherCourseItem';

class TeacherPanel extends Component {

	componentDidMount() {
		this.props.getCourses();

		if(this.props.location.notification_message) {
			toast.dismiss();
			toast.success(`ℹ ${this.props.location.notification_message}`)
		}
	}

	render() {
        const { courses } = this.props.courseStore;

		return (
			<div className="transition-page">
				<div className="projects">
					<div className="container">
						<div className="row">
							<div className="col-md-11 mx-auto mb-4">

								<h5 className="display-4 text-center mt-3">Courses</h5>

								<Link to="/teacherPanel/addCourse" className="btn btn-md btn-primary mt-2">
									<i className="fa fa-plus-circle" aria-hidden="true"/> Add Course
								</Link>
								<hr/>

								{
									(courses.length === 0) ?
										<Alert color="info" className="text-center">
											<i className="fa fa-info-circle" aria-hidden="true"/> You have no courses.
										</Alert>
										:
										courses.map(course => (
											<TeacherCourseItem key={course.id} course={course}/>
										)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TeacherPanel.propTypes = {
    courseStore: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    courseStore: state.courseStore
});

export default connect(mapStateToProps, { getCourses })(TeacherPanel);
