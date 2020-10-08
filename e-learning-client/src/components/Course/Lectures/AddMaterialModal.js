import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { addLectureMaterials } from '../../../redux/actions/lectureActions';

import translate from '../../../i18n/translate';
import { injectIntl } from 'react-intl';

class AddMaterialModal extends Component {

    constructor() {
        super();
        this.state = {
            files: [],
            isOpen: false,
            isTooltipOpen: false,
            errors: {}
        }
        this.close.bind(this);
        this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        
        let newErrors = nextProps.errorStore;

        if(Object.keys(newErrors).length > 0) {
            if(newErrors.message) {
                let errors = {...newErrors};
                errors.materials = errors.message;
                this.setState({ errors });
            }
            else
                this.setState({ errors: nextProps.errorStore });
        }
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

    toggleToolTip = () => {
        this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
    }

    onSelectFile = (e) => {
        let errors = this.state.errors;
        errors.materials = undefined; 
        this.setState({ files: [...this.state.files, ...e.target.files], errors});
    }

    onRemoveFile = (fileName) => {
        const files = this.state.files.filter((file) => {
            return file.name !== fileName
        });
        this.setState({ files })
    }

    isAnyFileSelected = () => {
        if(this.state.files.length === 0)
            return false;
        return true;
    }

    onSubmit = e => {
        e.preventDefault();
        const { files } = this.state;
        const { intl, course_name, lecture_id } = this.props; 

        if(this.isAnyFileSelected()) {
            const formData = new FormData();

            files.forEach(file => {
                formData.append('materials', file);
            })

            const notification_message = intl.formatMessage({ id: 'lecture.materials.add-notification' });
            this.props.addLectureMaterials(course_name, lecture_id, formData, notification_message);
        }
        else {
            let errors = this.state.errors;
            errors.materials = 'You should select at least 1 file.';
            this.setState({ errors });
        }
    }

    clearData = () => {
        this.setState({
            files: [],
            isTooltipOpen: false,
            errors: {}
        });
    }

    render() {
        const { files, isOpen, isTooltipOpen, errors } = this.state;

        return (
            <>
                <button id="add-tooltip" className="btn btn-sm btn-outline-primary shadow float-right mr-1" onClick={this.toggle}> 
                    <i className="fa fa-plus-circle" aria-hidden="true" />
                </button>
                <Tooltip placement="top" isOpen={isTooltipOpen} target="add-tooltip" toggle={this.toggleToolTip}>
                    {translate('lecture.add-material')}
                </Tooltip>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="files text-capitalize"> 
                                        {translate('materials')} 
                                        <small className="text-muted"> ({translate('minimal-required-1')}) </small> 
                                    </label>
                                    <div class="custom-file">
                                        <input type="file" multiple id="files" name="files" id="customFile"
                                            className={classnames("custom-file-input shadow-sm ", {"is-invalid": errors.materials})}
                                            onChange={this.onSelectFile}/>
                                        <label class="custom-file-label text-muted" for="customFile"> {files.length} {translate('files-selected')} </label>
                                        { 
                                            errors.materials ? 
                                                (<div className="invalid-feedback"> { errors.materials } </div>) : null 
                                        }
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <ul class="list-group">
                                        {
                                            files.map( (file, index) => {
                                                return (
                                                    <li key={index} class="list-group-item text-muted"> 
                                                        {file.name}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm my-btn-danger border-bottom shadow-sm float-right" 
                                                            onClick={this.onRemoveFile.bind(this, file.name)}> 
                                                            <i className="fa fa-trash-o text-white" aria-hidden="true" />
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
            </>
        )
    }
}

AddMaterialModal.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addLectureMaterials: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addLectureMaterials })(injectIntl(AddMaterialModal));