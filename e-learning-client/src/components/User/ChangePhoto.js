import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePhoto } from './../../redux/actions/userActions';

import { injectIntl } from 'react-intl';
import Progress from 'react-progressbar';
import axios from 'axios';

class ChangePhoto extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: 0,
            photoPath: '',
            file: null,
            fileName: 'Choose file',
            message: '',
            error: true,
            isOpen: false,
            percentage: 0
        }
    }

    componentWillReceiveProps (nextProps) {
        const { id, path } = nextProps;
        this.setState({ id, photoPath: path });
    }

    onChange = e => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }

    toggleAlert = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    onSubmit = async e => {
        e.preventDefault();
        const { id, file } = this.state;
        
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`localhost:8080/api/uploads/photo/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }})
        .then(res => {

            let photoPath = res.data;
            this.props.changePhoto(photoPath);

            this.setState({
                photoPath,
                file: null, 
                fileName: 'Choose file', 
                percentage: 0,
                message: 'File uploaded successfully!',
                error: false
            });
            this.toggleAlert();
        })
        .catch(err => {
            if(err.response.status === 500)
                this.setState({ message: 'There was a problem with the server.', error: true });
            else
                this.setState({ message: err.response.data.message, error: true });
            this.toggleAlert();
        });
    }

    render() {
        const { photoPath, fileName, message, error, isOpen, percentage } = this.state;

        let dangerAlert = (<div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.toggleAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>);
        let successAlert = (<div className="alert alert-success alert-dismissible fade show" role="alert">
                                {message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.toggleAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>);
        let alert = error ? dangerAlert : successAlert;
        alert = isOpen ? alert : null;

        return (
            <>
                {alert}
                <img style={{ width: 100, height: 100 }} src={photoPath} />
                <form onSubmit={this.onSubmit}>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange}/>
                        <label className="custom-file-label" htmlFor="customFile">
                            {fileName}
                        </label>
                    </div>

                    <div className="mt-3">
                        <Progress completed={percentage}/>
                    </div>
                    
                    <input type="submit" value="Upload" className="btn btn-success btn-block mt-3"/>
                </form>
            </>
        )
    }
}

ChangePhoto.propTypes = {
    changePhoto: PropTypes.func.isRequired
};

export default connect(null, { changePhoto })(injectIntl(ChangePhoto));
