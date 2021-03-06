import React, { Component } from 'react';
import { Alert, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLectures, deleteLecture, deleteMaterial } from './../../../redux/actions/lectureActions';

import translate from './../../../i18n/translate';
import LectureListItem from './LectureListItem';
import AddLectureModal from './AddLectureModal';
import { BeatLoader } from 'react-spinners';
import { injectIntl } from 'react-intl';
import { confirmAlert } from 'react-confirm-alert';
import { roles } from './../../../utils/constants';
import { Link } from 'react-router-dom';

class LectureList extends Component {

    componentDidMount() {
        const { course_name } = this.props.match.params;
        this.props.getLectures(course_name);
    }

    onDeleteLecture = (lecture_id) => {
        
        const { course_name } = this.props.match.params;
        
        const { intl } = this.props; 
        const confirm = intl.formatMessage({ id: 'confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });
        const confirm_message = intl.formatMessage({ id: 'lecture.delete-confirm' });
        const notification_message = intl.formatMessage({ id: 'lecture.delete-notification' }, { id: lecture_id });

        confirmAlert({
			title: confirm,
			message: confirm_message,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.deleteLecture(course_name, lecture_id, notification_message)
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }

    onDeleteMaterial = (lecture_id, material_id) => {

        const { course_name } = this.props.match.params;
        
        const { intl } = this.props; 
        const confirm = intl.formatMessage({ id: 'confirm' });
        const yes = intl.formatMessage({ id: 'yes' });
        const no = intl.formatMessage({ id: 'no' });
        const confirm_message = intl.formatMessage({ id: 'material.delete-confirm' });
        const notification_message = intl.formatMessage({ id: 'material.delete-notification' }, { id: material_id });

        confirmAlert({
			title: confirm,
			message: confirm_message,
			buttons: [
				{
					label: yes,
					className: "confirm-yes",
					onClick: () => this.props.deleteMaterial(course_name, lecture_id, material_id, notification_message)
				},
				{
					label: no,
					className: "confirm-no"
			  	}
			]
		})
    }

    render() {
        const { course_name } = this.props.match.params;
        const { lectures, loading, role } = this.props;

        return (
            <div className="transition-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-9 p-2 mx-auto mt-2 mb-3">

                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/"> {translate('home')} </Link></BreadcrumbItem>
                                <BreadcrumbItem active> {course_name} </BreadcrumbItem>
                                <BreadcrumbItem active> {translate('lectures')} </BreadcrumbItem>
                            </Breadcrumb>

                            { role === roles.teacher ? <AddLectureModal course_name={course_name} /> : <hr/> }

                            {
                                loading ? 
                                    <div className="my-5">
                                        <BeatLoader
                                            size={20}
                                            color={"#195fcb"}
                                            css={{textAlign: "center"}}
                                            loading={loading}
                                        />
                                    </div>
                                    :
                                    (lectures.length === 0) ?
                                        <Alert color="info" className="text-center">
                                            <i className="fa fa-info-circle" aria-hidden="true"/> {translate('LectureList.empty')}
                                        </Alert>
                                        :
                                        lectures.map((lecture, index) => {
                                            return <LectureListItem 
                                                        key={index}
                                                        course_name={course_name}
                                                        role={role}
                                                        lecture={lecture} 
                                                        deleteLecture={this.onDeleteLecture.bind(this)} 
                                                        deleteMaterial={this.onDeleteMaterial.bind(this)}/>
                                        })
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LectureList.propTypes = {
    lectures: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    getLectures: PropTypes.func.isRequired,
    deleteLecture: PropTypes.func.isRequired,
    deleteMaterial: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    lectures: state.lectureStore.lectures,
    loading: state.lectureStore.loading,
    role: state.authStore.user.role
});

export default connect(mapStateToProps, { getLectures, deleteLecture, deleteMaterial })(injectIntl(LectureList));