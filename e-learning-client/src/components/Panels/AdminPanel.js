import React, { Component } from 'react';
import admin from '../../img/admin.png';

import translate from '../../i18n/translate';
import NewsList from '../News/NewsList';


class AdminPanel extends Component {

    render() {
        return (
            <>
                <NewsList />
            </>
        )
    }
}

export default AdminPanel;
