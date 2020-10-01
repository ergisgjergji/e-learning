import React, { Component } from 'react'

class NewsListItem extends Component {

    formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        return formated;
    }

    trimString = (str) => {
        return (str.length > 255) ? str.substr(0, 254) + "..." : str;
    }

    render() {
        const { header, body, createdTime, attachments } = this.props.news;
        const formatedTime = this.formatDateTime(createdTime);
        const formatedBody = this.trimString(body);

        return (
            <div className="border-bottom m-3">

                <div className="my-text-primary"> {header} </div>

                <p className="my-2"> 
                    {formatedBody}
                    <a href="#"> 
                        <u className="my-text-primary"> Read more </u> 
                    </a> 
                </p>

                {attachments.length > 0 ? <small className="text-muted"> <u> Contains {attachments.length} attachment/s </u> </small> : null}
                
                <div>
                    <small> <b> Time published: {formatedTime} </b> </small>
                </div>
            </div>
        )
    }
}

export default NewsListItem;
