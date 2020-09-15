import React from 'react';
import translate from '../../i18n/translate';

const Demo = () => {
    return (
        <div className="d-block text-secondary mt-3">
            <small className="rounded p-2">
                <i className="fa fa-info-circle" aria-hidden="true"/>&nbsp; {translate('landing-page-demo')}:
                <div className="d-block">
                    <b> Admin: </b> admin@admin.com - 123456
                </div> 
                <div className="d-block">
                    <b> {translate('teacher')}: </b> teacher1@test.com - 123456
                                    </div> 
                <div className="d-block">
                    <b> Student:</b> student1@test.com - 123456
                </div> 
            </small>
        </div>
    )
}

export default Demo;
