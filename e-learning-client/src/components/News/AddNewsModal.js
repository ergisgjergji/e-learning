import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { addNews } from './../../redux/actions/newsActions';

import translate from './../../i18n/translate';
import { injectIntl } from 'react-intl';

class AddNewsModal extends Component {

    constructor() {
        super();
        this.state = {
            header: "",
            body: "",
            attachments: [],
            isOpen: false,
            errors: {}
        }
        this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectAttachment = this.onSelectAttachment.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(Object.keys(nextProps.errorStore).length > 0)
            this.setState({ errors: nextProps.errorStore });
        else {
            this.clearData();
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen, errors: {} });
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
        const { size, intl } = this.props; 

        const formData = new FormData();
        formData.append('header', header);
        formData.append('body', body);
        attachments.forEach(a => {
            formData.append('attachments', a);
        })

        const notification_message = intl.formatMessage({ id: 'news.add-notification' });
        // size: needed in order to do a 'getNewsList' on a successfull 'addNews'
        this.props.addNews(formData, size, notification_message);
    }

    clearData = () => {
        this.setState({
            header: "",
            body: "",
            attachments: [],
            errors: {}
        });
    }

    render() {
        const { header,body, attachments, isOpen, errors } = this.state;

        return (
            <div>
                <button className="btn btn-md my-btn-primary" onClick={this.toggle}>
                    <i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-news')}
                </button>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">
                    <ModalHeader toggle={this.toggle}>
                        <h3 className="font-weight-normal"> {translate('new-announcement')} </h3>
                    </ModalHeader>

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="header"> {translate('news.header')} </label>
                                    <input type="text" required id="header" name="header" 
                                        className={classnames("form-control form-control-md shadow-sm ", {"is-invalid": errors.header})}
                                        value={header} onChange={this.onChange} />
                                        { 
                                            errors.header ? 
                                                (<div className="invalid-feedback"> { errors.header } </div>) : null 
                                        }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="body"> {translate('news.body')} </label>
                                    <textarea type="text" required rows="5" id="body" name="body" className="form-control form-control-md shadow-sm"
                                        value={body} onChange={this.onChange} />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="files"> {translate('news.attachments')} </label>
                                    <div class="custom-file">
                                        <input type="file" multiple id="files" name="files" class="custom-file-input shadow-sm" id="customFile" onChange={this.onSelectAttachment}/>
                                        <label class="custom-file-label text-muted" for="customFile"> {attachments.length} {translate('files-selected')} </label>
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <ul class="list-group">
                                        {
                                            attachments.map( (file, index) => {
                                                return (
                                                    <li key={index} class="list-group-item text-muted"> 
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
                            <button type="submit" className="btn my-btn-success shadow"> {translate('save')} </button>
                            <button type="button" className="btn my-btn-secondary shadow" onClick={this.toggle}> {translate('cancel')} </button>
                        </ModalFooter>

                    </form>
                </Modal>
            </div>
        )
    }
}

AddNewsModal.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addNews })(injectIntl(AddNewsModal));