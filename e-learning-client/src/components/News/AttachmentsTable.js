import React, { Component } from 'react';
import translate from './../../i18n/translate';

class AttachmentsTable extends Component {

    constructor() {
        super();
        this.state = {
            attachments: [],
            selected: []
        }
        this.renderContentTypeIcon.bind(this);
    }

    componentDidMount() {
        const { attachments } = this.props;
        this.setState({ attachments });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.attachments !== nextProps.attachments)
            this.setState({ attachments: nextProps.attachments });
    }

    renderContentTypeIcon = (contentType) => {
        switch(contentType) 
        {
            case "text/plain":
                return <i class="fa fa-file-text-o" aria-hidden="true" />; break;

            case "application/pdf":
                return <i class="fa fa-file-pdf-o" aria-hidden="true" />; break;

            case "image/png":
            case "image/jpg":
            case "image/jpeg":
                return <i class="fa fa-file-image-o" aria-hidden="true" />; break;

            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return <i class="fa fa-file-powerpoint-o" aria-hidden="true" />; break;

            case "application/vnd.rar":
            case "application/zip":
            case "application/x-7z-compressed":
                return <i class="fa fa-file-archive-o" aria-hidden="true" />; break;
                
            default:
                return <i class="fa fa-file-o" aria-hidden="true" />; break;
        }
    }

    render() {

        const { attachments } = this.state;
        return (attachments && attachments.length > 0) ?
        (
            <div>
                <small> 
                    <b> <i className="fa fa-paperclip" aria-hidden="true"></i> {translate('news.attachments')}: </b> 
                </small>

                <div className="table-responsive mt-2 shadow-sm">
                    <table class="table table-sm m-0">
                        <tr>
                            <th className="text-center"> 
                                <small> <b> {translate('attachment.fileName')}:  </b> </small> 
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
                                            <small> 
                                                {this.renderContentTypeIcon(a.contentType)} {a.fileName} 
                                            </small> 
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
        ) : null
    }
}

export default AttachmentsTable;
