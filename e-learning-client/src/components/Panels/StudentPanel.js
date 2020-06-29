import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';

import { toast } from 'react-toastify';
import StudentCourseItem from './../Course/StudentCourseItem';

class StudentPanel extends Component {

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

								<h1 className="display-4 text-center mt-3">Courses</h1>
								<hr/>

								{ 
									courses.map(course => (
										<StudentCourseItem key={course.id} course={course} history={this.props.history}/>
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

StudentPanel.propTypes = {
    courseStore: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    courseStore: state.courseStore
});

export default connect(mapStateToProps, { getCourses })(StudentPanel);
