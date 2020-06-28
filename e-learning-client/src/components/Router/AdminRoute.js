import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps} 
        render={props => ((authStore.isAuthenticated === true) && (authStore.user.role === "ADMIN")) ? 
                (<Component {...props}/>) : 
                (<Redirect to="/login"/>)
        }/>
);

AdminRoute.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(AdminRoute);