import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import translate from '../../i18n/translate';

class NewsListItem extends Component {

    constructor() {
        super();
        this.state = {
            isTooltipOpen: false
        }
        this.toggleTooltip.bind(this);
    }

    toggleTooltip = () => {
        this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
    }

    formatDateTime = (dateTime) => {
        const date = new Date(dateTime);

        let hours =  date.getHours();
        hours = hours + 2;

        const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + hours + ":" + date.getMinutes();
        return formated;
    }

    renderBody = (body) => {
        const length = body.length;

        return (length > 255) ? (
                <>
                    {body.substr(0, 254)}...
                </>
            ) : body;
    }

    render() {
        const { id, header, body, createdTime, attachments } = this.props.news;
        const { isTooltipOpen } = this.state;
        const formatedTime = this.formatDateTime(createdTime);

        return (
            <div className="card border-bottom my-3">

                <div className="card-header my-text-primary"> 
                    {header}
                    <i 
                        id="delete-tooltip" className="fa fa-trash fa-lg text-danger position-top-right" aria-hidden="true" 
                        onClick={() => this.props.deleteNews(id)}
                    ></i>
                    <Tooltip placement="right" isOpen={isTooltipOpen} target="delete-tooltip" toggle={this.toggleTooltip}>
                        {translate('delete')}
                    </Tooltip>
                </div>

                <div className="card-body m-0"> 
                    <p className="mb-1">
                        { this.renderBody(body) }
                    </p>
                    {attachments.length > 0 ? <small className="text-muted"> <u> {translate('contains-x-attachments', {x: attachments.length})} </u> </small> : null}
                    <button className="btn btn-sm my-btn-primary float-right"> View </button>
                </div>
                
                <div className="card-footer py-1">
                    <small> <b> {translate('news.createdTime')}: <u> {formatedTime} </u> </b> </small>
                </div>
            </div>
        )
    }
}

export default NewsListItem;
