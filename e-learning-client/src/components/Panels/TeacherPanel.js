import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';

import { Alert } from 'reactstrap';

import translate from "../../i18n/translate";
import TeacherCourseCard from './../Course/TeacherCourseCard/TeacherCourseCard';

class TeacherPanel extends Component {

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

								<h5 className="display-4 text-center mt-3"> {translate('courses')} </h5>

								<Link to="/teacherPanel/addCourse" className="btn btn-md my-btn-primary mt-2">
									<i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-course')}
								</Link>
								<hr/>

								{
									(courses.length === 0) ?
										<Alert color="info" className="text-center">
											<i className="fa fa-info-circle" aria-hidden="true"/> {translate('no-courses')}
										</Alert>
										:
										courses.map(course => (
											<TeacherCourseCard key={course.id} course={course}/>
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
