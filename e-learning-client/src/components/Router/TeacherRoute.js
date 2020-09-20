import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoScroll from '../Layout/Helpers/AutoScroll';
import ScrollTopButton from '../Layout/Helpers/ScrollTopButton';
import { roles } from '../../utils/constants';

const TeacherRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps} 
        render={props => ((authStore.isAuthenticated === true) && (authStore.user.role === roles.teacher)) ? 
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