import React, { Component } from 'react';
import translate from '../../i18n/translate';

class NewsListItem extends Component {

    formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        return formated;
    }

    trimString = (str) => {
        return (str.length > 255) ? str.substr(0, 254) + "..." : str;
    }

    renderBody = (news) => {
        const { id, body } = news;
        const length = body.length;
        
    }

    render() {
        const { header, body, createdTime, attachments } = this.props.news;
        const formatedTime = this.formatDateTime(createdTime);
        const formatedBody = this.trimString(body);

        return (
            <div className="border-bottom m-3">

                <div className="my-text-primary"> {header} </div>

                <p className="my-2"> 
                    {
                        
                    }
                </p>

                {attachments.length > 0 ? <small className="text-muted"> <u> {translate('contains-x-attachments', {x: attachments.length})} </u> </small> : null}
                
                <div>
                    <small> <b> {translate('news.createdTime')}: <u> {formatedTime} </u> </b> </small>
                </div>
            </div>
        )
    }
}

export default NewsListItem;
