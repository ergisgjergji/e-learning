import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourseById, updateCourse } from './../../redux/actions/courseActions';

import classnames from 'classnames';

class UpdateCourse extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            name: "",
            description: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getCourseById(id, this.props.history);
    }
    
    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });

            const { id, name, description } = nextProps.course;
            this.setState({ id, name, description });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { id, name, description } = this.state;
        const course = { id, name, description };
        
        this.props.updateCourse(course, this.props.history);
    }

    render() {

        const { id, name, description, errors } = this.state;

        return (
            <div className="container pt-4">
                <div className="row mb-4">
                    <div className="col-10 col-md-9 col-lg-7 m-auto">
                         
                        <button className="btn btn-secondary btn-sm shadow" onClick={() => this.props.history.goBack()}> 
                            <i className="fa fa-arrow-left" aria-hidden="true"/> Go back
                        </button>

                        <h5 className="display-4 text-center">Update Course</h5>
                        <hr />

                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="name">Course Name</label>
                                    <input type="text" id="name" name="name"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.name})}
                                        value={name} onChange={this.onChange} />
                                    { 
                                        errors.name ? 
                                            (<div className="invalid-feedback"> { errors.name } </div>) : null 
                                    }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="date" id="description" name="description"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.description})}
                                        value={description} onChange={this.onChange} />
                                    { 
                                        errors.description ? 
                                            (<div className="invalid-feedback"> { errors.description } </div>) : null 
                                    }
                                </div>

                                <input type="hidden" id="id" name="id" value={id}/>

                                <button type="submit" className="btn btn-primary btn-lg mt-4 mx-auto shadow-lg">
                                    <i class="fa fa-floppy-o" aria-hidden="true"/> Save
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

UpdateCourse.propTypes = {
    course: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    getCourseById: PropTypes.func.isRequired,
    updateCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    course: state.courseStore.current_course,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getCourseById, updateCourse })(UpdateCourse);