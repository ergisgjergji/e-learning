import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLectures } from './../../../redux/actions/lectureActions';

import translate from './../../../i18n/translate';
import LectureListItem from './LectureListItem';
import AddLectureModal from './AddLectureModal';


class LectureList extends Component {

    componentDidMount() {
        const { course_name } = this.props.match.params;
        this.props.getLectures(course_name);
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
                                (lectures.length === 0) ?
                                    <Alert color="info" className="text-center">
                                        <i className="fa fa-info-circle" aria-hidden="true"/> {translate('LectureList.empty')}
                                    </Alert>
                                    :
                                    lectures.map((lecture, index) => {
                                        return <LectureListItem key={index} lecture={lecture}/>
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
    getLectures: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    lectures: state.lectureStore.lectures,
    loading: state.lectureStore.loading,
    role: state.authStore.user.role
});

export default connect(mapStateToProps, { getLectures })(LectureList);