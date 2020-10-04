import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewsById } from '../../redux/actions/newsActions';

import translate from '../../i18n/translate';
import { injectIntl } from 'react-intl';
import { formatDateTime } from './../../utils/helpers';
import AttachmentsTable from './AttachmentsTable';

class NewsDetails extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            header: "",
            body: "",
            createdTime: "",
            attachments: [],
            errors: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getNewsById(id, this.props.history);
    }

    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });

            const { id, header, body, createdTime, attachments } = nextProps.news;
            this.setState({ id, header, body, createdTime, attachments });
    }

    render() {
        const { id, header, body, createdTime, attachments } = this.state;
        const formatedTime = formatDateTime(createdTime);

        return (
            <div className="transition-page">
                <div className="page col-11 col-md-9 col-lg-8 mx-auto mb-4">

                    <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-2" onClick={() => this.props.history.goBack()}> 
                        <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                    </button>

                    <h5 className="display-4 text-center my-text-primary"> {header} </h5>

                    <p className="mt-3 mb-0 p-3 border rounded shadow-sm"> {body} </p>

                    <div className="text-right pr-3"> 
                        <small> 
                            <i className="fa fa-clock-o" aria-hidden="true"/> {translate('news.createdTime')}: {formatedTime} 
                        </small>
                    </div>

                    <div className="mt-5">
                        <AttachmentsTable attachments={attachments} />
                    </div>
                    
                </div>
            </div>
        )
    }
}

NewsDetails.propTypes = {
    news: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    getNewsById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    news: state.newsStore.news,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getNewsById })(injectIntl(NewsDetails));