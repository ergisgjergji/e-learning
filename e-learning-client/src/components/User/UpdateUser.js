import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById, updateUser } from './../../redux/actions/userActions';
import classnames from 'classnames';

import translate from '../../i18n/translate';
import { FormattedMessage } from 'react-intl';

class UpdateUser extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            full_name: "",
            role: "",
            faculty: "",
            registration_date: "",
            username: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getUserById(id, this.props.history);
    }
    
    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });

            const { id, full_name, role, faculty, registration_date, username, password } = nextProps.user;
            this.setState({ id, full_name, role, faculty, registration_date, username, password });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { id, full_name, role, faculty, registration_date, username, password } = this.state;
        const user = { id, full_name, role, faculty, registration_date, username, password };
        
        this.props.updateUser(user, this.props.history);
    }

    render() {

        const { id, full_name, role, faculty, registration_date, username, password, errors } = this.state;

        return (
            <div className="transition-page">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-11 col-md-9 col-lg-7 m-auto">
                            
                            <button className="btn btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                            </button>

                            <h5 className="display-4 text-center"> {translate('update-user')} </h5>
                            <hr />

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="full_name"> {translate('full-name')} </label>
                                        <input type="text" id="full_name" name="full_name"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.full_name})}
                                            value={full_name} onChange={this.onChange} />
                                        { 
                                            errors.full_name ? 
                                                (<div className="invalid-feedback"> { errors.full_name } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="faculty"> {translate('faculty')} </label>
                                        <select name="faculty" className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.faculty})}
                                            value={faculty} onChange={this.onChange}>
                                            <FormattedMessage id="select-faculty">
                                                {(message) => <option value="" disabled> {message} </option>}
                                            </FormattedMessage>
                                            <FormattedMessage id="FTI">
                                                {(message) => <option value="FTI"> {message} </option>}
                                            </FormattedMessage>
                                            <FormattedMessage id="FIE">
                                                {(message) => <option value="FIE"> {message} </option>}
                                            </FormattedMessage>
                                            <FormattedMessage id="FIN">
                                                {(message) => <option value="FIN"> {message} </option>}
                                            </FormattedMessage>
                                        </select>
                                        { 
                                            errors.faculty ? 
                                                (<div className="invalid-feedback"> { errors.faculty } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="start_date"> {translate('registration-date')} </label>
                                        <input type="date" id="registration_date" name="registration_date"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.registration_date})}
                                            value={registration_date} onChange={this.onChange} />
                                        { 
                                            errors.registration_date ? 
                                                (<div className="invalid-feedback"> { errors.registration_date } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="username"> {translate('email')} </label>
                                        <input type="email" id="username" name="username"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.username})}
                                            value={username} onChange={this.onChange} />
                                        { 
                                            errors.username ? 
                                                (<div className="invalid-feedback"> { errors.username } </div>) : null 
                                        }
                                    </div>

                                    <input type="hidden" id="id" name="id" value={id}/>
                                    <input type="hidden" id="role" name="role" value={role}/>

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

UpdateUser.propTypes = {
    user: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    getUserById: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.userStore.current_user,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getUserById, updateUser })(UpdateUser);