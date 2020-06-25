import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/userActions';

import classnames from 'classnames';

class AddTeacher extends Component {

    constructor() {
        super();

        this.state = {
            full_name: "",
            role: "TEACHER",
            faculty: "",
            registration_date: "",
            username: "",
            password: "",
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

        const { full_name, role, faculty, registration_date, username, password } = this.state;
        const user = { full_name, role, faculty, registration_date, username, password };
        
        this.props.addUser(user, this.props.history);
    }

    render() {

        const { full_name, role, faculty, registration_date, username, password, errors } = this.state;

        return (
            <div className="container pt-4 mb-4">
                <div className="row">
                    <div className="col-10 col-md-9 col-lg-7 m-auto">
                            
                        <button className="btn btn-secondary btn-sm shadow" onClick={() => this.props.history.goBack()}> 
                            {`< Go back`} 
                        </button>

                        <h5 className="display-4 text-center">New Teacher</h5>
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
                                    <label htmlFor="faculty">Faculty</label>
                                    <select name="faculty" 
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.faculty})}
                                        value={faculty} onChange={this.onChange}>
                                        <option value="" disabled>Select Faculty</option>
                                        <option value="FTI">Fakulteti i Teknologjise se Informacionit</option>
                                        <option value="FIE">Fakulteti i Inxhinierise Elektrike</option>
                                        <option value="FIN">Fakulteti i Inxhinierise se Ndertimit</option>
                                    </select>
                                    { 
                                        errors.faculty ? 
                                            (<div className="invalid-feedback"> { errors.faculty } </div>) : null 
                                    }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="start_date">Registration Date</label>
                                    <input type="date" id="registration_date" name="registration_date"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.registration_date})}
                                        value={registration_date} onChange={this.onChange} />
                                    { 
                                        errors.registration_date ? 
                                            (<div className="invalid-feedback"> { errors.registration_date } </div>) : null 
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

                                <div className="form-group col-md-12">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password"
                                        className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.password})}
                                        value={password} onChange={this.onChange} />
                                    { 
                                        errors.password ? 
                                            (<div className="invalid-feedback"> { errors.password } </div>) : null 
                                    }
                                </div>

                                <input type="hidden" id="role" name="role" value={role}/>

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

AddTeacher.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addUser })(AddTeacher);