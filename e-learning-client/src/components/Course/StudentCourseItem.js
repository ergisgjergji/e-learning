import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Collapse, Fade, Badge, Tooltip } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';

import translate from "../../i18n/translate";
import { injectIntl } from 'react-intl';


class StudentCourseItem extends Component {

    constructor() {
        super();

        this.state = {
            tests: [],
            isDropdownOpen: false
        }
        this.toggleDropdown.bind(this);
        this.toggleTooltip.bind(this);
    }

    componentDidMount() {
    
        let { id } = this.props.course;
        axios.get(`/api/test/${id}/list`)
            .then(res => {

                let tests = res.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
                this.setState({ tests })
            })
            .catch(err => console.log(err));
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

    onTakeTest = (course_id, test_id) => {

        const { intl } = this.props;
        const confirm = intl.formatMessage({ id: 'confirm' });
        const confirmMessage = intl.formatMessage({ id: 'take-test-confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });

        confirmAlert({
			title: confirm,
			message: confirmMessage,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.history.push(`/studentPanel/course/${course_id}/test/${test_id}/complete`)
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
        const { tests, isDropdownOpen } = this.state;

		return (
			<div className="container p-0 rounded">
				<div className="card card-body bg-light mb-3 border border-secondary">

					<div className="row pb-4">

						<div className="col-12 col-4 col-md-3 border-right mb-2">
							<h5 className="mx-auto"> #{course.name} </h5>
                            <span className="d-block mt-1">
                                <small><i> {translate('by')} {course.teacher_name} </i></small>
                            </span>
                            <span className="d-block mt-3 mb-1 border border rounded text-center py-2 shadow-sm">
                                <small> <b> {translate('contact')}:</b> {course.teacher_email} </small>
                            </span>
						</div>

						<div className="col-12 col-md-4 col-8 border-right">
							<h5> {translate('description')}:</h5>
							<p>{course.description}</p>
						</div>

						<div className="col-12 col-md-5 d-lg-block">
							<ul className="list-group shadow-lg">

								<Link to={`/studentPanel/course/${course.id}/details`}>
									<li className="list-group-item update">
										<i className="fa fa-info-circle pr-1"> {translate('view-details')} </i>
									</li>
								</Link>

								<li className="list-group-item board" onClick={this.toggleDropdown}>
									<i className="fa fa-file-text pr-1"> {translate('manage-tests')} </i>
                                    <i className={`fa ${!isDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-up'} icon-position-right`} aria-hidden="true"/>
								</li>

                                <Collapse isOpen={isDropdownOpen}>
                                    <Fade in={isDropdownOpen}>
                                        {
                                            tests.map((test, index) => {

                                                if(test.completed)
                                                    return (
                                                        <Link to={`/studentPanel/course/${course.id}/test/${test.id}/details`} key={index}>
                                                            <li id={`tooltip-${index}`} className="list-group-item board bg-light">
                                                                <Badge 
                                                                    className="ml-3 mr-1" 
                                                                    color={classnames({"secondary": !test.completed}, {"success": test.passed}, {"danger": (test.completed && !test.passed)})}
                                                                >
                                                                { test.passed ? translate('pass') : translate('fail') }
                                                                </Badge>
                                                                { test.header }
                                                                <i className="fa fa-chevron-right icon-position-right" aria-hidden="true"/>
                                                            </li>

                                                            <Tooltip placement="right" target={`tooltip-${index}`} isOpen={this.state[`tooltip-${index}`]} toggle={() => this.toggleTooltip(`tooltip-${index}`)}>
                                                                {translate('view-details')}
                                                            </Tooltip>
                                                        </Link>
                                                    )
                                                else
                                                    return (
                                                        <div key={index}>
                                                            <li id={`tooltip-${index}`} className="list-group-item board bg-light" onClick={this.onTakeTest.bind(this,course.id, test.id)}>
                                                                <Badge 
                                                                    className="ml-3 mr-1" 
                                                                    color={classnames({"secondary": !test.completed}, {"success": test.passed}, {"danger": (test.completed && !test.passed)})}
                                                                >
                                                                { translate('take') }
                                                                </Badge>
                                                                { test.header }
                                                                <i className="fa fa-chevron-right icon-position-right" aria-hidden="true"/>
                                                            </li>

                                                            <Tooltip placement="right" target={`tooltip-${index}`} isOpen={this.state[`tooltip-${index}`]} toggle={() => this.toggleTooltip(`tooltip-${index}`)}>
                                                                { translate('take-test') }
                                                            </Tooltip>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </Fade>
                                </Collapse>
								
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

StudentCourseItem.propTypes = {
};

export default connect(null, {  })(injectIntl(StudentCourseItem));