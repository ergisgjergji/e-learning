import React, { Component } from 'react'

class NewsListItem extends Component {

    formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        return formated;
    }

    render() {
        const { header, body, createdTime, attachments } = this.props.news;
        const formatedTime = this.formatDateTime(createdTime);

        return (
            <div className="border-bottom m-3">
                <div className="text-primary"> {header} </div>
                <p> {body} </p>
                <b> Time published: {formatedTime} </b>
                <button className="btn btn-sm my-btn-primary">Read more</button>
            </div>
        )
    }
}

export default NewsListItem;
