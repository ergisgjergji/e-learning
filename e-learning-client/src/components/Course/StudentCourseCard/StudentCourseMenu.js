import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Collapse, Fade, Badge, Tooltip } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';

import { injectIntl } from 'react-intl';
import translate from './../../../i18n/translate';

class StudentCourseMenu extends Component {

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
    
        let { id } = this.props;
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
        const { id, course_name } = this.props;
        const { tests, isDropdownOpen } = this.state;
        return (
            <>
                <Link to={`/studentPanel/course/${id}/details`}>
					<li className="list-group-item update">
						<i className="fa fa-info-circle pr-1"> {translate('view-details')} </i>
					</li>
				</Link>

                <Link to={`/studentPanel/course/${course_name}/lectures`}>
                    <li className="list-group-item board">
                        <i className="fa fa-folder-open-o pr-1"> {translate('lectures')} </i>
                    </li>
                </Link>

                <Link to={`/studentPanel/course/${course_name}/assignments`}>
                    <li className="list-group-item board">
                        <i className="fa fa-list-alt pr-1"> {translate('assignments')} </i>
                    </li>
                </Link>

				<li id="manageTestsBtn" className="list-group-item board" onClick={this.toggleDropdown}>
					<i className="fa fa-file-text pr-1"> {translate('tests')} </i>
                    <i className={`fa ${!isDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-up'} icon-position-right`} aria-hidden="true"/>
				</li>

                <Collapse isOpen={isDropdownOpen}>
                    <Fade in={isDropdownOpen}>
                        {
                            (tests.length === 0) ? 
                                <li className="list-group-item board bg-cloud text-secondary">
                                    <i className="fa fa-info-circle" aria-hidden="true"/> {translate('TestBaseList-empty')}
                                </li>
                                :
                                tests.map((test, index) => {

                                    if(test.completed)
                                        return (
                                            <Link to={`/studentPanel/course/${id}/test/${test.id}/details`} key={index}>
                                                <li id={`tooltip-${index}`} className="list-group-item board bg-cloud">
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
                                                <li id={`tooltip-${index}`} className="list-group-item board bg-cloud" onClick={this.onTakeTest.bind(this, id, test.id)}>
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
            </>
        )
    }
}

export default injectIntl(StudentCourseMenu);