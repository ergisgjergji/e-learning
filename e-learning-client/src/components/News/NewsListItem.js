import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import translate from '../../i18n/translate';
import { formatDateTime } from './../../utils/helpers';
import { connect } from 'react-redux';
import { roles } from './../../utils/constants';

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
        const { role } = this.props;
        const { isTooltipOpen } = this.state;
        const formatedTime = formatDateTime(createdTime);

        return (
            <div className="card border-bottom my-3">

                <div className="card-header my-text-primary"> 
                    <h5 className="p-0 m-0"> {header} </h5>
                    {
                        (role === roles.admin) ? 
                            <>
                                <i id="delete-tooltip" className="fa fa-trash fa-lg text-danger position-top-right" aria-hidden="true" 
                                    onClick={() => this.props.deleteNews(id)}
                                ></i>
                                <Tooltip placement="right" isOpen={isTooltipOpen} target="delete-tooltip" toggle={this.toggleTooltip}>
                                    {translate('delete')}
                                </Tooltip>
                            </>
                            : null 
                    }
                </div>

                <div className="card-body m-0"> 
                    <p className="mb-1">
                        { this.renderBody(body) }
                    </p>
                    {attachments.length > 0 ? <small className="text-muted"> <u> {translate('contains-x-attachments', {x: attachments.length})} </u> </small> : null}
                    <div className="d-inline-block float-right">
                        <Link to={`/newsList/${id}`} className="btn btn-sm my-btn-primary" onClick={this.toggle}> 
                            <i className="fa fa-eye" aria-hidden="true"></i> {translate('view')} 
                        </Link>
                    </div>
                    
                </div>
                
                <div className="card-footer py-1">
                    <small> 
                        <i className="fa fa-clock-o" aria-hidden="true"/> {translate('news.createdTime')}: {formatedTime} 
                    </small>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    role: state.authStore.user.role
});

export default connect(mapStateToProps, null)(NewsListItem);
