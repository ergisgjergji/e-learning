import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/authActions';

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/"/>
        )
    }
};

Logout.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
