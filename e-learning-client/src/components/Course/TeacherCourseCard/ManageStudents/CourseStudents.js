import React, { Component } from "react";

import RegisteredStudents from "./RegisteredStudents";
import NonRegisteredStudents from "./NonRegisteredStudents";

class CourseStudents extends Component {

	shouldComponentUpdate() {
        return false;
    }

	render() {
        const { id } = this.props.match.params;
        const { history } = this.props 

		return (
            <div className="transition-page">
                <div className="col-12 col-md-11 col-lg-9 p-1 mx-auto">
                    <RegisteredStudents course_id={id} history={history}/>
                    <NonRegisteredStudents course_id={id} history={history}/>
                </div>
            </div>
		);
	}
}

export default CourseStudents;