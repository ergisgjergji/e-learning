import React, { Component } from 'react';
import translate from './../../i18n/translate';

class AttachmentsTable extends Component {

    constructor() {
        super();
        this.state = {
            attachments: [],
            zipUrl: ''
        }
        this.renderContentTypeIcon.bind(this);
    }

    componentDidMount() {
        const { attachments } = this.props;
        this.setState({ attachments });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.attachments !== nextProps.attachments) {

            let zipUrl = '';
            let { attachments } = nextProps;

            if(attachments && attachments.length > 0) {
                zipUrl = 'http://localhost:8080/zipDownload?fileType=attachment';
                attachments.map(a => zipUrl = zipUrl + `&fileNames=${a.fileName}`);
            }
            
            this.setState({ 
                attachments: nextProps.attachments,
                zipUrl
            });
        }
    }
    
    renderContentTypeIcon = (contentType) => {
        switch(contentType) 
        {
            case "text/plain":
                return <i className="fa fa-file-text-o" aria-hidden="true" />; break;

            case "application/pdf":
                return <i className="fa fa-file-pdf-o" aria-hidden="true" />; break;

            case "image/png":
            case "image/jpg":
            case "image/jpeg":
                return <i className="fa fa-file-image-o" aria-hidden="true" />; break;

            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return <i className="fa fa-file-powerpoint-o" aria-hidden="true" />; break;

            case "application/vnd.rar":
            case "application/zip":
            case "application/x-7z-compressed":
                return <i className="fa fa-file-archive-o" aria-hidden="true" />; break;
                
            default:
                return <i className="fa fa-file-o" aria-hidden="true" />; break;
        }
    }

    render() {
        const { attachments, zipUrl } = this.state;

        return (attachments && attachments.length > 0) ?
        (
            <div>
                <small> 
                    <b> <i className="fa fa-paperclip" aria-hidden="true"></i> {translate('news.attachments')}: </b> 
                </small>

                <a href={zipUrl}>
                    <button className=" btn btn-sm btn-outline-primary float-right">
                        <i className="fa fa-download" aria-hidden="true" /> Dowload all
                    </button>
                </a>

                <div className="table-responsive mt-3 shadow-sm">
                    <table className="table table-sm m-0">
                        <thead>
                            <tr>
                                <th className="text-center"> 
                                    <small> <b> {translate('attachment.fileName')}:  </b> </small> 
                                </th>
                                <th className="text-center text-capitalize"> 
                                    <small> <b> {translate('action')}:  </b> </small> 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
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
                                                <a href={a.previewUrl} target="_blank">
                                                    <button className="btn btn-sm btn-outline-info shadow-sm m-1">
                                                        <i className="fa fa-eye" aria-hidden="true" />
                                                    </button>
                                                </a> 
                                                :
                                                <button className="btn btn-sm btn-info disabled shadow-sm m-1">
                                                    <i className="fa fa-eye-slash text-white" aria-hidden="true" />
                                                </button>
                                        }
                                            <a href={a.downloadUrl}>
                                                <button className="btn btn-sm btn-outline-primary shadow-sm m-1">
                                                    <i className="fa fa-download" aria-hidden="true" />
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        ) : null
    }
}

export default AttachmentsTable;
