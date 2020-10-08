import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLectures, deleteLecture } from './../../../redux/actions/lectureActions';

import translate from './../../../i18n/translate';
import LectureListItem from './LectureListItem';
import AddLectureModal from './AddLectureModal';
import { BeatLoader } from 'react-spinners';
import { injectIntl } from 'react-intl';
import { confirmAlert } from 'react-confirm-alert';

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

    render() {
        const { course_name } = this.props.match.params;
        const { lectures, loading } = this.props;

        return (
            <div className="transition-page">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">

                            <h1 className="display-4 text-center mt-3"> {course_name} </h1>

                            <AddLectureModal course_name={course_name} />

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
                                            return <LectureListItem key={index} course_name={course_name} lecture={lecture} deleteLecture={this.onDeleteLecture.bind(this)} />
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
    deleteLecture: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    lectures: state.lectureStore.lectures,
    loading: state.lectureStore.loading,
    role: state.authStore.user.role
});

export default connect(mapStateToProps, { getLectures, deleteLecture })(injectIntl(LectureList));