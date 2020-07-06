import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';

import { Alert } from "reactstrap";
import StudentCourseItem from './../Course/StudentCourseItem';

class StudentPanel extends Component {

	componentDidMount() {
		this.props.getCourses();
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
									(courses.length === 0) ?
										<Alert color="info" className="text-center">
											<i className="fa fa-info-circle" aria-hidden="true"/> You have no courses.
										</Alert>
										:
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
