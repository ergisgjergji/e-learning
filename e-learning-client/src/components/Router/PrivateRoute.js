import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoScroll from '../Layout/AutoScroll';

const PrivateRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps} 
        render={props => authStore.isAuthenticated === true ? 
                (
                    <>
                        <AutoScroll/>
                        <Component {...props}/>
                    </>
                ) : 
                (<Redirect to="/login"/>)
        }/>
);

PrivateRoute.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(PrivateRoute);