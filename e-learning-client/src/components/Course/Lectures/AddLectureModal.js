import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { addLecture } from '../../../redux/actions/lectureActions';

import translate from '../../../i18n/translate';
import { injectIntl } from 'react-intl';

import TextareaAutosize from 'react-textarea-autosize';

class AddLectureModal extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            materials: [],
            isOpen: false,
            errors: {}
        }
        this.close.bind(this);
        this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(Object.keys(nextProps.errorStore).length > 0)
            this.setState({ errors: nextProps.errorStore });
        else {
            this.clearData();
            this.close();
        }
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen, errors: {} });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectFile = (e) => {
        let errors = this.state.errors;
        errors.materials = undefined; 
        this.setState({ materials: [...this.state.materials, ...e.target.files], errors});
    }

    onRemoveFile = (fileName) => {
        const materials = this.state.materials.filter((m) => {
            return m.name !== fileName
        });
        this.setState({ materials })
    }

    isAnyFileSelected = () => {
        if(this.state.materials.length === 0)
            return false;
        return true;
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, materials } = this.state;
        const { intl, course_name } = this.props; 

        if(this.isAnyFileSelected()) {
            const formData = new FormData();

            formData.append('name', name);
            materials.forEach(m => {
                formData.append('materials', m);
            })

            const notification_message = intl.formatMessage({ id: 'lecture.add-notification' });
            this.props.addLecture(course_name, formData, notification_message);
        }
        else {
            let errors = this.state.errors;
            errors.materials = 'You should select at least 1 file.';
            this.setState({ errors });
        }
    }

    clearData = () => {
        this.setState({
            name: "",
            materials: [],
            errors: {}
        });
    }

    render() {
        const { name, materials, isOpen, errors } = this.state;

        return (
            <div>
                <button className="btn btn-md my-btn-primary" onClick={this.toggle}>
                    <i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-lecture')}
                </button>
                <hr/>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">
                    <ModalHeader toggle={this.toggle}>
                        <h3 className="font-weight-normal"> {translate('new-lecture')} </h3>
                    </ModalHeader>

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="header"> {translate('lecture.name')} </label>
                                    <small className="text-muted"> ({translate('lecture.name.example')}) </small>
                                    <input type="text" required id="name" name="name" 
                                        className={classnames("form-control form-control-md shadow-sm ", {"is-invalid": errors.name})}
                                        value={name} onChange={this.onChange} />
                                        { 
                                            errors.name ? 
                                                (<div className="invalid-feedback"> { errors.name } </div>) : null 
                                        }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="files text-capitalize"> 
                                        {translate('materials')} 
                                        <small className="text-muted"> ({translate('minimal-required-1')}) </small> 
                                    </label>
                                    <div class="custom-file">
                                        <input type="file" multiple id="files" name="files" id="customFile"
                                            className={classnames("custom-file-input shadow-sm ", {"is-invalid": errors.materials})}
                                            onChange={this.onSelectFile}/>
                                        <label class="custom-file-label text-muted" for="customFile"> {materials.length} {translate('files-selected')} </label>
                                        { 
                                            errors.materials ? 
                                                (<div className="invalid-feedback"> { errors.materials } </div>) : null 
                                        }
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <ul class="list-group">
                                        {
                                            materials.map( (file, index) => {
                                                return (
                                                    <li key={index} class="list-group-item text-muted"> 
                                                        {file.name}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger border-bottom shadow-sm icon-position-right" 
                                                            onClick={this.onRemoveFile.bind(this, file.name)}> 
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

AddLectureModal.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addLecture: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addLecture })(injectIntl(AddLectureModal));