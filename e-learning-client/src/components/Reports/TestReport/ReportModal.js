import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Tooltip } from 'reactstrap';
import axios from 'axios';
import BarChart from '../../Charts/BarChart';

class ReportModal extends Component {

    state = {
        questions: [],
        isOpen: false,
        isTooltipOpen: false
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    toggleTooltip = () => {
        this.setState({ isTooltipOpen: !this.state.isTooltipOpen })
    }

    fetchData = () => {
        const id = this.props.testbase_id;

        axios.get(`/api/reports/test-report/${id}`)
            .then(res => this.setState({ questions: res.data }));
    }

    render() {
        const { questions, isOpen, isTooltipOpen } = this.state;

        return (
            <>
                <button id="report-tooltip" className="btn btn-sm btn-outline-primary float-right" onClick={this.toggle}>
                    <i class="fa fa-bar-chart" aria-hidden="true"/>
                </button>
                <Tooltip placement="top" isOpen={isTooltipOpen} target="report-tooltip" toggle={this.toggleTooltip}>
                    View report
                </Tooltip>
                <Modal isOpen={isOpen} toggle={this.toggle} onEnter={this.fetchData} size='lg' centered={true}>
                    <ModalBody>
                        <div className="row">
                        {
                            questions.length > 0 ?
                                questions.map((question, index) => {
                                    return (
                                        <div key={index} class="col-6">
                                            <BarChart question={question} />
                                        </div>
                                    )
                                }) : <small className="text-muted"> This test has not been taken by any student yet. </small>
                        }
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default ReportModal;