import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById, resetPassword } from './../../redux/actions/userActions';
import classnames from 'classnames';

import translate from './../../i18n/translate';
import { injectIntl } from 'react-intl';

class ResetPassword extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            new_password: "",
            fromRoute: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { fromRoute } = this.props.history.location;
        this.props.getUserById(id, this.props.history);
        
        this.setState({ id, fromRoute });
    }

    onChange = e => {

        if(e.target.value.length < 6)
            this.setState({ errors: { new_password: "Password length must be at least 6." } })
        else
            this.setState({ errors: {} })

        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { id, new_password, fromRoute, errors } = this.state;
        const resetPasswordModel = { id, new_password };

        const { intl } = this.props;
        const notificationMessage = intl.formatMessage({ id: 'reset-password-toast' });
        
        if(!errors.new_password && new_password.length >= 6)
            this.props.resetPassword(resetPasswordModel, fromRoute, this.props.history, notificationMessage);
    }

    render() {

        const { id, new_password, errors } = this.state;

        return (
            <div className="transition-page">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-11 col-md-8 col-lg-7 m-auto">
                            
                            <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')} 
                            </button>

                            <h5 className="display-4 text-center"> {translate('reset-password')} </h5>
                            <br/>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <input type="password" id="new_password" name="new_password" required
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.new_password})}
                                            value={new_password} onChange={this.onChange} />
                                        { 
                                            errors.new_password ? 
                                                (<div className="invalid-feedback"> { errors.new_password } </div>) : null 
                                        }
                                    </div>

                                    <button type="submit" className="btn my-btn-success btn-lg mt-4 mx-auto shadow-lg" value="Save">
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

ResetPassword.propTypes = {
    getUserById: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired
};

export default connect(null, { getUserById, resetPassword })(injectIntl(ResetPassword));