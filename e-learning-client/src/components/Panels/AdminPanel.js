import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import admin from '../../img/admin.png';

class AdminPanel extends Component {
    render() {
        return (
            <div className="admin-container bg-light">
                <div className="admin-panel p-2 border border-dark rounded">
                    <div className="text-center">
                        <img src={admin} alt="Admin logo" style={{ width: "80px", height: "80px" }}/>
                    </div>
                    <h5 className="display-4 text-center">Admin panel</h5>
                </div>
            </div>
        )
    }
}

AdminPanel.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(AdminPanel);
