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
                    return this.props.history.push("/adminPanel");
                case "TEACHER":
                    return this.props.history.push("/teacherPanel");
                case "STUDENT":
                    return this.props.history.push("/studentPanel");
            }
    }

    render() {
        return (
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
