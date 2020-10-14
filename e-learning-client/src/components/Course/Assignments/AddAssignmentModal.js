import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { addAssignment } from '../../../redux/actions/assignmentActions';

import translate from '../../../i18n/translate';
import { injectIntl } from 'react-intl';

import TextareaAutosize from 'react-textarea-autosize';

class AddAssignmentModal extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            due_date: null,
            assignment: null,
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
        errors.assignment = undefined; 
        this.setState({ assignment: e.target.files[0], errors});
    }

    isAnyFileSelected = () => {
        if(this.state.assignment === null)
            return false;
        return true;
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, due_date, assignment } = this.state;
        const { intl, course_name } = this.props; 

        if(this.isAnyFileSelected()) {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('due_date', due_date);
            formData.append('assignment', assignment);

            const notification_message = intl.formatMessage({ id: 'assignment.add-notification' });
            this.props.addAssignment(course_name, formData, notification_message);
        }
        else {
            let errors = this.state.errors;
            errors.assignment = 'You should select 1 file.';
            this.setState({ errors });
        }
    }

    clearData = () => {
        this.setState({
            name: "",
            due_date: null,
            assignment: null,
            errors: {}
        });
    }

    render() {
        const { name, due_date, assignment, isOpen, errors } = this.state;

        return (
            <div>
                <button className="btn btn-md my-btn-primary" onClick={this.toggle}>
                    <i className="fa fa-plus-circle" aria-hidden="true"/> {translate('add-assignment')}
                </button>
                <hr/>

                <Modal isOpen={isOpen} toggle={this.toggle} onClosed={this.clearData} backdrop="static">
                    <ModalHeader toggle={this.toggle}>
                        <h3 className="font-weight-normal"> {translate('new-assignment')} </h3>
                    </ModalHeader>

                    <form onSubmit={this.onSubmit}>

                        <ModalBody>
                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="header"> {translate('assignment.name')} </label>
                                    <small className="text-muted"> ({translate('assignment.name.example')}) </small>
                                    <input type="text" required id="name" name="name" 
                                        className={classnames("form-control form-control-md shadow-sm ", {"is-invalid": errors.name})}
                                        value={name} onChange={this.onChange} />
                                        { 
                                            errors.name ? 
                                                (<div className="invalid-feedback"> { errors.name } </div>) : null 
                                        }
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="due_date"> {translate('due_date')} </label>
                                    <input type="date" required id="due_date" name="due_date" 
                                        className={classnames("form-control form-control-md shadow-sm ", {"is-invalid": errors.due_date})}
                                        value={due_date} onChange={this.onChange} />
                                        { 
                                            errors.due_date ? 
                                                (<div className="invalid-feedback"> { errors.due_date } </div>) : null 
                                        }
                                </div>

                                <div className="form-group col-md-12">
                                    <div class="custom-file shadow-sm">
                                        <input type="file" id="assignment" name="assignment" id="customFile"
                                            className={classnames("custom-file-input ", {"is-invalid": errors.assignment})}
                                            onChange={this.onSelectFile}/>
                                        <label class="custom-file-label text-muted text-small" for="customFile"> {assignment ? assignment.name : translate('choose-file')} </label>
                                        { 
                                            errors.assignment ? 
                                                (<div className="invalid-feedback"> { errors.assignment } </div>) : null 
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

AddAssignmentModal.propTypes = {
    errorStore: PropTypes.object.isRequired,
    addAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { addAssignment })(injectIntl(AddAssignmentModal));