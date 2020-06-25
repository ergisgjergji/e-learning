import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from './../../redux/actions/courseActions';

import classnames from 'classnames';

class AddCourse extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, description } = this.state;
        const course = { name, description };

        this.props.addCourse(course, this.props.history);
    }

    render() {

        const { name, description, errors } = this.state;

        return (
            <div className="container pt-4 mb-4">
                <div className="row mb-4">
                    <div className="col-10 col-md-9 col-lg-7 m-auto">
                         
                        <button className="btn btn-secondary btn-sm shadow" onClick={() => this.props.history.goBack()}> 
                            {`< Go back`} 
                        </button>

                        <h5 className="display-4 text-center">New Course</h5>
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
                                    <textarea type="text" id="description" name="description"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.description})}
                                        value={description} onChange={this.onChange} />
                                    { 
                                        errors.description ? 
                                            (<div className="invalid-feedback"> { errors.description } </div>) : null 
                                    }
                                </div>

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

AddCourse.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addCourse })(AddCourse);