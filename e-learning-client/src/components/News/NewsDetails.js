import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewsById } from '../../redux/actions/newsActions';

import translate from '../../i18n/translate';
import { injectIntl } from 'react-intl';
import { formatDateTime } from './../../utils/helpers';

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
                        <small> <u> {translate('news.createdTime')}: {formatedTime} </u> </small>
                    </div>

                    {
                        (attachments && attachments.length > 0)
                            ?
                            <div className="mt-5">
                                 <small> <b> {translate('news.attachments')}:  </b> </small>
                                <div className="table-responsive mt-2 shadow-sm">
                                    <table class="table table-sm">
                                        <tr>
                                            <th className="text-center"> 
                                                <small> <b> {translate('attachment.fileName')}:  </b> </small> 
                                            </th>
                                            <th className="text-center"> 
                                                <small> <b> {translate('attachment.contentType')}:  </b> </small> 
                                            </th>
                                            <th className="text-center text-capitalize"> 
                                                <small> <b> {translate('action')}:  </b> </small> 
                                            </th>
                                        </tr>
                                        {
                                            attachments.map((a, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td className="text-center"> 
                                                            <small> {a.fileName} </small> 
                                                        </td>
                                                        <td className="text-center"> 
                                                            <small> <i> {a.contentType} </i> </small> 
                                                        </td>
                                                        <td className="text-center">
                                                        {
                                                            a.previewEnabled ?
                                                                <a href={a.previewUrl} target="_blank" className="btn btn-sm btn-info shadow-sm m-1">
                                                                    <i className="fa fa-eye text-white" aria-hidden="true" />
                                                                </a> 
                                                                :
                                                                <button className="btn btn-sm btn-info disabled shadow-sm m-1">
                                                                    <i className="fa fa-eye-slash text-white" aria-hidden="true" />
                                                                </button>
                                                        }
                                                            <a href={a.downloadUrl} className="btn btn-sm btn-primary shadow-sm m-1">
                                                                <i className="fa fa-download text-white" aria-hidden="true" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                    

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