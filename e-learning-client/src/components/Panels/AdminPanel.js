import React, { Component } from 'react';
import admin from '../../img/admin.png';

import translate from '../../i18n/translate';


class AdminPanel extends Component {

    render() {
        return (
            <div className="admin-container">
                <div className="admin-panel p-3 border border-dark rounded shadow">
                    <div className="text-center">
                        <img src={admin} alt="Admin logo" style={{ width: "80px", height: "80px" }}/>
                    </div>
                    <h1 className="text-center"> {translate('admin-panel')} </h1>
                </div>
            </div>
        )
    }
}

export default AdminPanel;
