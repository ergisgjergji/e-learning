import React, { Component } from 'react';
import translate from './../../i18n/translate';
import { contentTypeIcon } from '../../utils/helpers';

class AttachmentsTable extends Component {

    buildZipUrl = (attachments) => {
        let token = localStorage.getItem('token');
        let zipUrl = `http://localhost:8080/zipDownload?fileType=attachment&token=${token}`;

        attachments.map(a => zipUrl = zipUrl + `&fileNames=${a.fileName}`);
        return zipUrl;
    }

    render() {
        const { attachments } = this.props;

        return (attachments && attachments.length > 0) ?
        (
            <div>
                <small> 
                    <b> <i className="fa fa-paperclip" aria-hidden="true"></i> {translate('news.attachments')}: </b> 
                </small>

                <a href={this.buildZipUrl(attachments)}>
                    <button className=" btn btn-sm btn-outline-primary float-right">
                        <i className="fa fa-download" aria-hidden="true" /> {translate('download-all')}
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
                                
                                let token = localStorage.getItem('token');
                                let previewUrl = a.previewUrl + `&token=${token}`;
                                let downloadUrl = a.downloadUrl + `&token=${token}`;

                                return (
                                    <tr key={index}>
                                        <td className="text-center"> 
                                            <small> 
                                                <i className={`fa ${contentTypeIcon(a.contentType)} fa-lg`} /> {a.fileName} 
                                            </small> 
                                        </td>
                                        <td className="text-center">
                                        {
                                            a.previewEnabled ?
                                                <a href={previewUrl} target="_blank">
                                                    <button className="btn btn-sm btn-outline-info shadow-sm m-1">
                                                        <i className="fa fa-eye" aria-hidden="true" />
                                                    </button>
                                                </a> 
                                                :
                                                <button className="btn btn-sm btn-info disabled shadow-sm m-1">
                                                    <i className="fa fa-eye-slash text-white" aria-hidden="true" />
                                                </button>
                                        }
                                            <a href={downloadUrl}>
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
