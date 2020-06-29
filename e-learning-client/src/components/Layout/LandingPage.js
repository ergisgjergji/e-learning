import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Image } from 'reactstrap';

class LandingPage extends Component {

    componentDidMount() {   
        if(this.props.authStore.isAuthenticated)
            switch(this.props.authStore.user.role) {
                case "ADMIN":
                    this.props.history.push("/adminPanel"); break;
                case "TEACHER":
                    this.props.history.push("/teacherPanel"); break;
                case "STUDENT":
                    this.props.history.push("/studentPanel"); break;
            }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.authStore.isAuthenticated)
            switch(nextProps.authStore.user.role) {
                case "ADMIN":
                    this.props.history.push("/adminPanel"); break;
                case "TEACHER":
                    this.props.history.push("/teacherPanel"); break;
                case "STUDENT":
                    this.props.history.push("/studentPanel"); break;
            }
    }

    render() {
        return (
            <div className="transition-page">
                <div className="landing">
                    <div className="light-overlay landing-inner text-dark">

                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">

                                    <h1 className="display-4 mb-4">E-Learning</h1>
                                    <p className="lead">
                                        A platform that helps teachers and students all round the world.
                                    </p>
                                    <hr/>
                                    
                                    <Link to="/login" className="btn btn-lg btn-primary mr-2"> Login </Link>

                                    <label className="d-block text-secondary mt-3">
                                    <small className="rounded p-2">
                                            <i className="fa fa-info-circle" aria-hidden="true"/> Use credentials: <u>admin@admin.com</u> & <u>123456</u> for demonstration. 
                                        </small>
                                    </label>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

LandingPage.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(LandingPage);
