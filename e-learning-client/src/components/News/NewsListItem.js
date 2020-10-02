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

    renderBody = (news) => {
        const { id, body } = news;
        const length = body.length;

        return (length > 255) ? (
                <p>
                    {body.substr(0, 254)}...  <a href="#" className="my-text-primary"> <u>Read more</u> </a>
                </p>
            ) : body
    }

    render() {
        const { header, body, createdTime, attachments } = this.props.news;
        const { isTooltipOpen } = this.state;
        const formatedTime = this.formatDateTime(createdTime);

        return (
            <div className="card border-bottom my-3">

                <div className="card-header my-text-primary"> 
                    {header}
                    <i id="delete-tooltip" className="fa fa-trash fa-lg text-danger position-top-right" aria-hidden="true"></i>
                    <Tooltip placement="right" isOpen={isTooltipOpen} target="delete-tooltip" toggle={this.toggleTooltip}>
                        {translate('delete')}
                    </Tooltip>
                </div>

                <div className="card-body m-0"> 
                    {
                        this.renderBody(this.props.news)
                    }
                </div>

                {attachments.length > 0 ? <small className="text-muted"> <u> {translate('contains-x-attachments', {x: attachments.length})} </u> </small> : null}
                
                <div className="card-footer ">
                    <small> <b> {translate('news.createdTime')}: <u> {formatedTime} </u> </b> </small>
                </div>
            </div>
        )
    }
}

export default NewsListItem;
