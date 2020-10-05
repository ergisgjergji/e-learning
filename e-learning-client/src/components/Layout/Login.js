import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './../../redux/actions/authActions';
import { clearErrors } from './../../redux/actions/errorActions';
import classnames from 'classnames';

import translate from '../../i18n/translate';

class Login extends Component {

    constructor(){
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.authStore.isAuthenticated)
            switch(this.props.authStore.user.role) {
                case "ADMIN":
                    this.props.history.push("/newsList"); break;
                case "TEACHER":
                    this.props.history.push("/teacherPanel"); break;
                case "STUDENT":
                    this.props.history.push("/studentPanel"); break;
            }
    }

    componentWillReceiveProps (nextProps) {
        if(this.state.errors !== nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });
        
            
        if(nextProps.authStore.isAuthenticated)
            switch(nextProps.authStore.user.role) {
                case "ADMIN":
                    this.props.history.push("/newsList"); break;
                case "TEACHER":
                    this.props.history.push("/teacherPanel"); break;
                case "STUDENT":
                    this.props.history.push("/studentPanel"); break;
            }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        // Reset the errors (in component state && in redux state)
        this.setState({ errors: {} });
        this.props.clearErrors();

        const { username, password } = this.state;
        const loginRequest = { username, password };
        this.props.login(loginRequest);
    }

    render() {

        const { username, password, errors } = this.state;

        return (
            <div className="transition-page">
                <div className="login">
                    <div className="container">
                        <div className="row">

                            <div className="col-10 col-md-8 col-lg-6 mx-auto my-4">

                                <h1 className="display-4 text-center"> {translate('login')} </h1>
                                <br/>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-row">

                                        <div className="form-group col-md-12">
                                            <label htmlFor="username"> {translate('email')} </label>
                                            <input type="email" id="username" name="username"
                                                className={classnames("form-control form-control-md shadow", {"is-invalid": errors.username})}
                                                value={username} onChange={this.onChange} />
                                            { 
                                                errors.username ? 
                                                    (<div className="invalid-feedback"> { errors.username } </div>) : null 
                                            }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="password"> {translate('password')} </label>
                                            <input type="password" id="password" name="password"
                                                className={classnames("form-control form-control-md shadow", {"is-invalid": errors.password})}
                                                value={password} onChange={this.onChange} />
                                            { 
                                                errors.password ? 
                                                    (<div className="invalid-feedback"> { errors.password } </div>) : null 
                                            }
                                        </div>
                                        
                                        <button type="submit" value="Login" className="btn my-btn-outline-primary btn-lg mt-4 mx-auto shadow-lg">
                                            <i className="fa fa-sign-in" aria-hidden="true"/> {translate('login')}
                                        </button>

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

Login.propTypes = {
    authStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    authStore: state.authStore,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { clearErrors, login })(Login);
