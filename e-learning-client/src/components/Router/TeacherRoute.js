import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoScroll from './../Layout/AutoScroll';
import ScrollTopButton from '../Layout/ScrollTopButton';

const TeacherRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps} 
        render={props => ((authStore.isAuthenticated === true) && (authStore.user.role === "TEACHER")) ? 
                (
                    <>
                        <AutoScroll/>
                        <Component {...props}/>
                        <ScrollTopButton/>
                    </>
                ) : 
                (<Redirect to="/login"/>)
        }/>
);

TeacherRoute.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(TeacherRoute);