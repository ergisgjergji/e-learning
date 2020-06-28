import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import RegisteredStudents from "./RegisteredStudents";
import NonRegisteredStudents from "./NonRegisteredStudents";

class CourseStudents extends Component {

	componentDidMount() {

        if(this.props.location.notification_message) {
			toast.dismiss();
			toast.success(`ℹ ${this.props.location.notification_message}`)
		}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.notification_message) {
            toast.dismiss();
			toast.success(`ℹ ${nextProps.location.notification_message}`)
        }
    }

	render() {
        const { id } = this.props.match.params;
        const { history } = this.props 

		return (
			<div className="col-12 col-md-10 col-lg-8 p-0 mx-auto">
                <RegisteredStudents course_id={id} history={history}/>
                <NonRegisteredStudents course_id={id} history={history}/>
            </div>
		);
	}
}

CourseStudents.propTypes = {
};

const mapStateToProps = state => ({
});

export default CourseStudents