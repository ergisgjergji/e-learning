import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoScroll from '../Layout/Helpers/AutoScroll';
import ScrollTopButton from '../Layout/Helpers/ScrollTopButton';
import { roles } from '../../utils/constants';

const PublicRoute = ({ component: Component, authStore, ...otherProps }) => (

    <Route 
        {...otherProps}
        render={props => {
            if(authStore.isAuthenticated === false)
                return (
                    <>
                        <AutoScroll/>
                        <Component {...props} {...otherProps}/>
                        <ScrollTopButton/>
                    </>
                )

            else
                switch(authStore.user.role) {
                    case roles.admin:
                        return <Redirect to="/adminPanel"/>; 
                        break;
                    case roles.teacher:
                        return <Redirect to="/teacherPanel"/>;
                        break;
                    case roles.student:
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