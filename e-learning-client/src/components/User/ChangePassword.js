import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById, changePassword } from './../../redux/actions/userActions';
import classnames from 'classnames';

import translate from '../../i18n/translate';

class ChangePassword extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            old_password: "",
            new_password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props;        
        this.setState({ id });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { id, old_password, new_password, errors } = this.state;
        const changePasswordModel = { id, old_password, new_password };

        // console.log(changePasswordModel);
        this.props.changePassword(changePasswordModel, this.props.history);
    }

    render() {

        const { id, old_password, new_password, errors } = this.state;

        return (
            <div className="transition-page">
                <div className="page container mb-4">
                    <div className="row">
                        <div className="col-11 col-md-9 col-lg-7 m-auto">
                            
                            <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                                <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                            </button>

                            <h5 className="display-4 text-center"> {translate('change-password')} </h5>
                            <hr />

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="new_password"> {translate('password')} </label>
                                        <input type="password" id="old_password" name="old_password"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.password})}
                                            value={old_password} onChange={this.onChange} />
                                        { 
                                            errors.password ? 
                                                (<div className="invalid-feedback"> { errors.password } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="new_password"> {translate('new-password')} </label>
                                        <input type="password" id="new_password" name="new_password"
                                            className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.new_password})}
                                            value={new_password} onChange={this.onChange} />
                                        { 
                                            errors.new_password ? 
                                                (<div className="invalid-feedback"> { errors.new_password } </div>) : null 
                                        }
                                    </div>

                                    <input type="hidden" id="id" name="id"/>
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

ChangePassword.propTypes = {
    id: PropTypes.string.isRequired,
    errorStore: PropTypes.object.isRequired,
    getUserById: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    id: state.authStore.user.id,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getUserById, changePassword })(ChangePassword);