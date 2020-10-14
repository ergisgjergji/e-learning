import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { uploadSolution } from './../../../redux/actions/assignmentActions';

import translate from '../../../i18n/translate';
import { injectIntl } from 'react-intl';

class UploadSolutionModal extends Component {

    constructor() {
        super();
        this.state = {
            solutionFile: null,
            isOpen: false,
            errors: {}
        }
        this.close.bind(this);
        this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
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
        errors.solution = undefined; 
        this.setState({ solutionFile: e.target.files[0], errors});
    }

    isAnyFileSelected = () => {
        if(this.state.solutionFile === null)
            return false;
        return true;
    }

    onSubmit = e => {
        e.preventDefault();
        const { solutionFile, errors } = this.state;
        const { intl, solution } = this.props; 

        if(this.isAnyFileSelected()) {
            const formData = new FormData();

            formData.append('solution', solutionFile);

            const notification_message = intl.formatMessage({ id: 'solution.add-notification' });
            this.props.uploadSolution(solution, formData, notification_message);
        }
        else {
            let errors = this.state.errors;
            errors.solution = 'You should select 1 file.';
            this.setState({ errors });
        }
    }

    clearData = () => {
        this.setState({
            solution: null,
            errors: {}
        });
    }

    render() {
        const { solutionFile, isOpen, errors } = this.state;
        const { solution } = this.props;
        const disabled = (solution.submitted === true) ? true : false;

        return (
            <div>
                <button disabled={disabled} className="btn btn-sm btn-outline-primary" onClick={this.toggle}>
                    <i className="fa fa-upload" aria-hidden="true"/> {translate('solution')}
                </button>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="files text-capitalize"> {translate('upload-solution')} </label>
                                    <div class="custom-file shadow-sm">
                                        <input type="file" id="solutionFile" name="solutionFile" id="customFile"
                                            className={classnames("custom-file-input shadow-sm ", {"is-invalid": errors.solution})}
                                            onChange={this.onSelectFile}/>
                                        <label class="custom-file-label text-muted text-small" for="customFile"> {solutionFile ? solutionFile.name : translate('choose-file')} </label>
                                        { 
                                            errors.solution ? 
                                                (<div className="invalid-feedback"> { errors.solution } </div>) : null 
                                        }
                                    </div>
                                </div>
                                {
                                    errors.message ?
                                        <div className="form-group col-md-12">
                                            <Alert color="danger">
                                                {errors.message}
                                            </Alert>
                                        </div> : null
                                }
                                <small className="form-group col-md-12 text-muted m-0 p-0">
                                    * You can only select 1 file. If your solution contains more than 1 file, upload them as a compressed file!
                                </small>
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

UploadSolutionModal.propTypes = {
    errorStore: PropTypes.object.isRequired,
    uploadSolution: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { uploadSolution })(injectIntl(UploadSolutionModal));