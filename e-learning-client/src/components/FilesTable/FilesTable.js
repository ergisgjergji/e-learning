import React, { Component } from 'react';
import translate from '../../i18n/translate';
import { contentTypeIcon, capitalizeWord } from '../../utils/helpers';

class FilesTable extends Component {

    buildZipUrl = (files, fileType) => {
        let token = localStorage.getItem('token');
        let zipUrl = `http://localhost:8080/zipDownload?fileType=${fileType}&token=${token}`;

        files.map(a => zipUrl = zipUrl + `&fileNames=${a.fileName}`);
        return zipUrl;
    }

    renderTableName = (fileType) => {
        switch(fileType) {
            case "attachment":
                return translate('attachments'); 
                break;
            case "material":
                return translate('materials'); 
                break;
            case "assignment":
                return translate('assignments');
                break;
            default:
                return translate('files'); 
                break;
        }
    }

    render() {
        const { fileType, files } = this.props;

        return (files && files.length > 0) ?
        (
            <div>
                <small className="text-capitalize"> 
                    <b> <i className="fa fa-paperclip" aria-hidden="true"></i> {this.renderTableName(fileType)}: </b> 
                </small>

                <a href={this.buildZipUrl(files, fileType)}>
                    <button className=" btn btn-sm btn-outline-primary float-right">
                        <i className="fa fa-download" aria-hidden="true" /> {translate('download-all')}
                    </button>
                </a>

                <div className="table-responsive mt-3 shadow-sm">
                    <table className="table table-sm m-0">
                        <thead>
                            <tr>
                                <th className="text-center"> 
                                    <small> <b> {translate('fileName')}:  </b> </small> 
                                </th>
                                <th className="text-center text-capitalize"> 
                                    <small> <b> {translate('action')}:  </b> </small> 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            files.map((file, index) => {
                                
                                let token = localStorage.getItem('token');
                                let previewUrl = file.previewUrl + `&token=${token}`;
                                let downloadUrl = file.downloadUrl + `&token=${token}`;

                                return (
                                    <tr key={index}>
                                        <td className="text-center"> 
                                            <small> 
                                                <i className={`fa ${contentTypeIcon(file.contentType)} fa-lg`} /> {file.fileName} 
                                            </small> 
                                        </td>
                                        <td className="text-center">
                                        {
                                            file.previewEnabled ?
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

export default FilesTable;
