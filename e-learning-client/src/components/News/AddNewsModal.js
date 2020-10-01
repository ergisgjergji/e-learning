import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNews } from './../../redux/actions/newsActions';

class AddNewsModal extends Component {

    constructor() {
        super();
        this.state = {
            header: "",
            body: "",
            attachments: [],
            isOpen: false
        }
        this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectAttachment = this.onSelectAttachment.bind(this);
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectAttachment = (e) => {
        this.setState({ attachments: [...this.state.attachments, ...e.target.files] });
    }

    onRemoveAttachment = (fileName) => {
        const attachments = this.state.attachments.filter((a) => {
            return a.name !== fileName
        });
        this.setState({ attachments })
    }

    onSubmit = e => {
        e.preventDefault();
        const { header, body, attachments } = this.state;

        const formData = new FormData();
        formData.append('header', header);
        formData.append('body', body);
        attachments.forEach(a => {
            formData.append('attachments', a);
        })

        const notification_message = "News added successfully"; // used for translation later
        this.props.addNews(formData, notification_message);
        this.toggle();
    }

    clearData = () => {
        this.setState({
            header: "",
            body: "",
            attachments: []
        });
    }

    render() {
        const { header,body, attachments, isOpen } = this.state;

        return (
            <div>
                <button className="btn btn-md my-btn-primary" onClick={this.toggle}>
                    <i className="fa fa-plus-circle" aria-hidden="true"/> Add news
                </button>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">
                    <ModalHeader toggle={this.toggle}>
                        New announcement
                    </ModalHeader>

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="header"> Title </label>
                                    <input type="text" required id="header" name="header" className="form-control form-control-md"
                                        value={header} onChange={this.onChange} />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="body"> Message </label>
                                    <textarea type="text" required rows="5" id="body" name="body" className="form-control form-control-md"
                                        value={body} onChange={this.onChange} />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="files"> Attachment(s) </label>
                                    <div class="custom-file">
                                        <input type="file" multiple id="files" name="files" class="custom-file-input" id="customFile" onChange={this.onSelectAttachment}/>
                                        <label class="custom-file-label text-muted" for="customFile"> {attachments.length} files selected </label>
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <ul class="list-group">
                                        {
                                            attachments.map( (file, index) => {
                                                return (
                                                    <li key={index} class="list-group-item"> 
                                                        {file.name}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger border-bottom shadow-sm icon-position-right" 
                                                            onClick={this.onRemoveAttachment.bind(this, file.name)}> 
                                                            X 
                                                        </button> 
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <button type="submit" className="btn my-btn-success"> Save </button>
                            <button type="button" className="btn my-btn-secondary" onClick={this.toggle}> Cancel </button>
                        </ModalFooter>

                    </form>
                </Modal>
            </div>
        )
    }
}

AddNewsModal.propTypes = {
    addNews: PropTypes.func.isRequired
};


export default connect(null, { addNews })(AddNewsModal);