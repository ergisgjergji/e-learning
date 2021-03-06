import React, { Component } from 'react';
import { Collapse, Fade } from 'reactstrap';
import TestResultPaper from './TestResultPaper';

class TestResultItem extends Component {

    constructor(){
        super();

        this.state = {
            test: {},
            isOpen: false
        };
        this.onToggle.bind(this);
    }

    componentDidMount() {
        const { test } = this.props;
        this.setState({ test });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { test, isOpen } = this.state;

        return (
            <div className="col-12 p-0 mx-auto">

                <button className="btn btn-md my-btn-secondary shadow" onClick={this.onToggle}>
                {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {test.header}
                </button>
                <hr/>

                <div className="paper mt-4">
                    <Collapse isOpen={isOpen}>
                        <Fade in={isOpen}>
                            {
                                Object.keys(test).length ?
                                    <TestResultPaper test={test}/>
                                    : null
                            }
                                
                        </Fade>
                    </Collapse>
                </div>
                
            </div>
        )
    }
}

export default TestResultItem;