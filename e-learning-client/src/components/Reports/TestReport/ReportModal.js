import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import BarChart from './BarChart';

class ReportModal extends Component {

    state = {
        questions: [],
        isOpen: false
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    fetchData = () => {
        const id = this.props.testbase_id;

        axios.get(`/api/reports/test-report/${id}`)
            .then(res => this.setState({ questions: res.data }));
    }

    render() {
        const { questions, isOpen } = this.state;
        return (
            <>
                <button className="btn btn-sm btn-outline-primary float-right" onClick={this.toggle}>
                    <i class="fa fa-bar-chart" aria-hidden="true"/>
                </button>
                <Modal isOpen={isOpen} toggle={this.toggle} onEnter={this.fetchData} size='lg' centered={true}>
                    <ModalBody>
                        <h3 className="font-weight-light shadow-sm border rounded text-center"> {this.props.title} </h3>
                        <div className="row">
                        {
                            questions.length > 0 ?
                                questions.map((question, index) => {
                                    return (
                                        <div key={index} class="col-12 col-md-12 col-lg-6">
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