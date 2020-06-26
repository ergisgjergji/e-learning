import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Collapse, Fade, Badge, Tooltip } from 'reactstrap';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class StudentCourseItem extends Component {

    constructor() {
        super();

        this.state = {
            isDropdownOpen: false
        }
        this.toggleDropdown.bind(this);
        this.toggleTooltip.bind(this);
    }

    toggleDropdown = () => {
        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    toggleTooltip = (target) => {
        this.setState({
            ...this.state,
            [target]: !this.state[target]
          });
    }

    onTestHover = (e) => {

    }

	onDeleteClick = (id) => {
        
		confirmAlert({
			title: 'Confirm',
			message: 'Are u sure u want to delete this course?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					onClick: () => {
                        this.props.deleteCourse(id);
                        toast.dismiss();
                        toast.info(`ℹ Course with id '${id}' was deleted successfully.`);
                    }
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
        const { isDropdownOpen } = this.state;

		return (
			<div className="container rounded">
				<div className="card card-body bg-light mb-3 border border-secondary">

					<div className="row pb-4">
						<div className="col-4 col-md-3 border-right">
							<h5 className="mx-auto"> #{course.name} </h5>
                            <span className="d-block mt-1">
                                <small><i> by {course.teacher_name} </i></small>
                            </span>
                            <span className="d-block mt-3 mb-1 border border rounded text-center py-4 shadow-sm">
                                <small> <b>Contact:</b> {course.teacher_email} </small>
                            </span>
						</div>

						<div className="col-md-4 col-8 border-right">
							<h5>Description:</h5>
							<p>{course.description}</p>
						</div>

						<div className="col-md-5 d-lg-block">
							<ul className="list-group shadow-lg">

								<Link to={`/studentPanel/course/${course.id}/details`}>
									<li className="list-group-item update">
										<i className="fa fa-info-circle pr-1"> Details </i>
									</li>
								</Link>

								<li className="list-group-item board" onClick={this.toggleDropdown}>
									<i className="fa fa-file-text pr-1"> Tests </i>
                                    <i className={`fa ${!isDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-up'} icon-position-right`} aria-hidden="true"/>
								</li>

                                <Collapse isOpen={isDropdownOpen}>
                                    <Fade in={isDropdownOpen}>

                                        <>
                                            <li id="tooltip-1" className="list-group-item board bg-light">
                                                <Badge className="ml-3 mr-1" color="success">Pass</Badge>
                                                Teza A
                                                <i className="fa fa-chevron-right icon-position-right" aria-hidden="true"/>
                                            </li>
                                            <Tooltip className="bg-danger" placement="right" target="tooltip-1" isOpen={this.state["tooltip-1"]} toggle={() => this.toggleTooltip("tooltip-1")}>
                                                View details
                                            </Tooltip>
                                        </>

                                        <>
                                            <li id="tooltip-2" className="list-group-item board bg-light">
                                                <Badge className="ml-3 mr-1" color="danger">Fail</Badge>
                                                Teza B
                                                <i className="fa fa-chevron-right icon-position-right" aria-hidden="true"/>
                                            </li>
                                            <Tooltip placement="right" target="tooltip-2" isOpen={this.state["tooltip-2"]} toggle={() => this.toggleTooltip("tooltip-2")}>
                                                View details
                                            </Tooltip>
                                        </>

                                        <>
                                            <li id="tooltip-3" className="list-group-item board bg-light">
                                                <Badge className="ml-3 mr-1" color="secondary">Take</Badge>
                                                Teza C
                                                <i className="fa fa-chevron-right icon-position-right" aria-hidden="true"/>
                                            </li>
                                            <Tooltip placement="right" target="tooltip-3" isOpen={this.state["tooltip-3"]} toggle={() => this.toggleTooltip("tooltip-3")}>
                                                Take the test now
                                            </Tooltip>
                                        </>

                                    </Fade>
                                </Collapse>
								
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

StudentCourseItem.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(null, {  })(StudentCourseItem);