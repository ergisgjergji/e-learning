import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoScroll from '../Layout/AutoScroll';
import ScrollTopButton from '../Layout/ScrollTopButton';

const PublicRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps}
        render={props => {

            if(authStore.isAuthenticated === false)
                return (
                    <>
                        <AutoScroll/>
                        <Component {...props}/>
                        <ScrollTopButton/>
                    </>
                )

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