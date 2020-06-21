import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById, updateProfile } from './../../redux/actions/userActions';

import classnames from 'classnames';

class UpdateProfile extends Component {

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
        const { id } = this.props;
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
        
        this.props.updateProfile(user, this.props.history);
    }

    render() {

        const { id, full_name, role, faculty, registration_date, username, password, errors } = this.state;

        return (
            <div className="container">
                <div className="row mb-4">
                    <div className="col-10 col-md-9 col-lg-7 m-auto">
                         
                        <button className="btn btn-secondary btn-sm shadow" onClick={() => this.props.history.goBack()}> 
                            {`< Go back`} 
                        </button>

                        <h5 className="display-4 text-center">Update user</h5>
                        <hr />

                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="full_name">Full name</label>
                                    <input type="text" id="full_name" name="full_name"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.full_name})}
                                        value={full_name} onChange={this.onChange} />
                                    { 
                                        errors.full_name ? 
                                            (<div className="invalid-feedback"> { errors.full_name } </div>) : null 
                                    }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="username">Username</label>
                                    <input type="email" id="username" name="username"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.username})}
                                        value={username} onChange={this.onChange} />
                                    { 
                                        errors.username ? 
                                            (<div className="invalid-feedback"> { errors.username } </div>) : null 
                                    }
                                </div>

                                <input type="hidden" id="id" name="id" value={id}/>
                                <input type="hidden" id="faculty" name="faculty" value={faculty}/>
                                <input type="hidden" id="role" name="role" value={role}/>
                                <input type="hidden" id="registration_date" name="registration_date" value={registration_date}/>
                                <input type="hidden" id="password" name="password" value={password}/>

                                <input type="submit" className="btn btn-primary btn-lg mt-4 mx-auto shadow-lg"/>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

UpdateProfile.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    getUserById: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    id: state.authStore.user.id,
    user: state.userStore.current_user,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getUserById, updateProfile })(UpdateProfile);