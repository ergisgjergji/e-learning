import React from 'react';
import { Link } from 'react-router-dom';
import translate from '../../i18n/translate';

const Jumbotron = () => {
    return (
        <div className="text-center p-5">
            <h1 className="display-4 mb-4">E-Learning</h1>
            <p className="lead">
                {translate('landing-page-header')}
            </p>
            <hr/>
            <Link to="/login" className="btn btn-lg my-btn-primary mr-2"> {translate('login')} </Link>
        </div>
    )
}

export default Jumbotron;
