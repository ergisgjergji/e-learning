import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import translate from './../../../i18n/translate';
import { roles } from './../../../utils/constants';

class CourseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { course, role } = this.props;
        
        return (
            <div className="rounded">
                <div className="card card-body bg-cloud mb-3 border border-secondary">

                    <div className="row pb-4">
                            
                        <div className="col-12 col-md-3 border-right mb-3">
                            <h5 className="mx-auto"> #{course.name} </h5>
                            {
                                role === roles.student ?
                                    <>
                                        <span className="d-block mt-1">
                                            <small><i> {translate('by')} {course.teacher_name} </i></small>
                                        </span>
                                        <span className="d-block mt-3 mb-1 border border rounded text-center py-2 shadow-sm">
                                            <small> <b> Email:</b> {course.teacher_email} </small>
                                        </span>
                                    </> : null
                                    
                            }
                        </div>

                        <div className="col-12 col-md-4 col-8 border-right">
                            <h5> {translate('description')}: </h5>
                            <p>{course.description}</p>
                        </div>

                        <div className="col-12 col-md-5">
                            <ul className="list-group shadow">

                                {this.props.children}
                                    
                            </ul>
                        </div>
                    </div>

                    <div className="date-info d-flex flex-column my-2 pr-1 border-dark">
                        <span>
                            <i className="fa fa-clock-o" aria-hidden="true"/> <b> {translate('created')}:</b> {course.created_date}
                        </span>
                        <span>
                            <i className="fa fa-info-circle" aria-hidden="true"/> <b> {translate('updated')}:</b> {course.updated_date}
                        </span>
                    </div>

                </div>
            </div>
        )
    }
}

CourseCard.propTypes = {
    role: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    role: state.authStore.user.role
});

export default connect(mapStateToProps, {  })(CourseCard);
