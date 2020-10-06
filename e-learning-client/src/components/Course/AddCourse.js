import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from './../../redux/actions/courseActions';
import classnames from 'classnames';

import translate from '../../i18n/translate';
import { injectIntl } from 'react-intl';

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

        const { intl } = this.props;
        const notificationMessage = intl.formatMessage({ id: 'add-course-toast' });

        this.props.addCourse(course, this.props.history, notificationMessage);
    }

    render() {

        const { name, description, errors } = this.state;

        return (
            <div className="transition-page">
                <div className="page container mb-4">
                    <div className="row">
                        <div className="col-11 col-md-9 col-lg-7 m-auto">
                            
                            <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                            </button>

                            <h5 className="display-4 text-center"> {translate('new-course')} </h5>
                            <hr />

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"> {translate('name')} </label>
                                        <input type="text" id="name" name="name"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.name})}
                                            value={name} onChange={this.onChange} />
                                        { 
                                            errors.name ? 
                                                (<div className="invalid-feedback"> { errors.name } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="description"> {translate('description')} </label>
                                        <textarea type="text" id="description" name="description" rows="5"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.description})}
                                            value={description} onChange={this.onChange} />
                                        { 
                                            errors.description ? 
                                                (<div className="invalid-feedback"> { errors.description } </div>) : null 
                                        }
                                    </div>

                                    <button type="submit" className="btn my-btn-primary btn-lg mt-4 mx-auto shadow-lg">
                                        <i className="fa fa-floppy-o" aria-hidden="true"/> {translate('save')}
                                    </button>

                                </div>
                            </form>

                        </div>
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

export default connect(mapStateToProps, { addCourse })(injectIntl(AddCourse));