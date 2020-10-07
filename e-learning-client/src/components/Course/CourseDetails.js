import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourseById } from './../../redux/actions/courseActions';

import translate from '../../i18n/translate';
import TextareaAutosize from 'react-textarea-autosize';

class UpdateCourse extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            teacher_name: "",
            teacher_email: "",
            created_date: "",
            updated_date: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getCourseById(id, this.props.history);
    }
    
    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });

            const { name, description, teacher_name, teacher_email, created_date, updated_date } = nextProps.course;
            this.setState({ name, description, teacher_name, teacher_email, created_date, updated_date });
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render() {

        const { name, description, teacher_name, teacher_email, created_date, updated_date } = this.state;

        return (
            <div className="transition-page">
                <div className="container mb-4">
                    <div className="row ">
                        <div className="col-11 col-md-9 col-lg-7 m-auto">
                            
                            <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                            </button>

                            <h5 className="display-4 text-center"> {translate('course-details')} </h5>
                            <hr/>

                            {/* <form onSubmit={this.onSubmit}> */}
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"> {translate('name')} </label>
                                        <input disabled type="text" id="name" name="name"
                                            className="form-control form-control-md shadow-sm"
                                            value={name}/>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="description"> {translate('description')} </label>
                                        <TextareaAutosize disabled rows="3" type="date" id="description" name="description"
                                            className="form-control form-control-md shadow-sm"
                                            value={description}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="name"> {translate('teacher-name')} </label>
                                        <input disabled type="text" id="name" name="name"
                                            className="form-control form-control-md shadow-sm"
                                            value={teacher_name}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="teacher_email"> {translate('teacher-email')} </label>
                                        <input disabled type="text" id="teacher_email" name="teacher_email"
                                            className="form-control form-control-md shadow-sm"
                                            value={teacher_email}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="created_date"> {translate('created')} </label>
                                        <input disabled type="text" id="created_date" name="created_date"
                                            className="form-control form-control-md shadow-sm"
                                            value={created_date}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="updated_date"> {translate('updated')} </label>
                                        <input disabled type="text" id="updated_date" name="updated_date"
                                            className="form-control form-control-md shadow-sm"
                                            value={updated_date}/>
                                    </div>

                                </div>
                            {/* </form> */}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateCourse.propTypes = {
    course: PropTypes.object.isRequired,
    getCourseById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    course: state.courseStore.current_course
});

export default connect(mapStateToProps, { getCourseById })(UpdateCourse);