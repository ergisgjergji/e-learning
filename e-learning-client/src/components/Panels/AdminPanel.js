import React, { Component } from 'react';
import admin from '../../img/admin.png';

class AdminPanel extends Component {

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

export default AdminPanel;
