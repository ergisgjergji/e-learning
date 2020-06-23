import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import admin from '../../img/admin.png';

class AdminPanel extends Component {

    componentDidMount() {
        if(this.props.location.notification_message) {
            toast.dismiss();
            toast.success(`ℹ ${this.props.location.notification_message}`)
        }
    }

    render() {
        return (
            <div className="admin-container bg-light">
                <div className="admin-panel p-3 border border-dark rounded shadow">
                    <div className="text-center bg-primary">
                        <img src={admin} alt="Admin logo" style={{ width: "80px", height: "80px" }}/>
                    </div>
                    <h5 className="display-3 text-center text-primary">Admin panel</h5>
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
