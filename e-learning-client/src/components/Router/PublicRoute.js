import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps}
        render={props => {

            if(authStore.isAuthenticated === false)
                return <Component {...props}/>;

            else
                switch(authStore.user.role) {
                    case "ADMIN":
                        return <Redirect to="/adminPanel"/>; 
                        break;
                    case "TEACHER":
                        return <Redirect to="/teacherPanel"/>;
                        break;
                    case "STUDENT":
                        return <Redirect to="/studentPanel"/>;
                        break;
                }
        }}/>
);

PublicRoute.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(PublicRoute);