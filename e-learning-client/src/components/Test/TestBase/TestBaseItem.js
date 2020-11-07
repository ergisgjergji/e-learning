import React, { Component } from 'react';
import { Collapse, Fade } from 'reactstrap';

import QuestionBaseItem from './QuestionBaseItem';
import ReportModal from './../../Reports/TestReport/ReportModal';

class TestBaseItem extends Component {

    constructor(){
        super();

        this.state = {
            header: "",
            questions: [],
            isOpen: false
        };
        this.onToggle.bind(this);
    }

    componentDidMount() {
        const { header, questions } = this.props.test;
        this.setState({header, questions });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { header, questions, isOpen } = this.state;
        const length = questions.length;

        return (
            <div className="col-12 mt-1 p-0 mx-auto">

                <button className="btn btn-sm my-btn-secondary shadow" onClick={this.onToggle}>
                     {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {header}
                </button>
                <ReportModal key={this.props.test.id} testbase_id={this.props.test.id} title={header}/>
                <hr/>

                <div className="paper mt-4">
                    <Collapse isOpen={isOpen}>
                        <Fade in={isOpen}>
                            <div className="px-2 mb-4 border">
                                <div className="text-center h5 m-4 pt-2"><u>{header}</u></div>
                                {
                                    questions.map((question, index) => {
                                        return <QuestionBaseItem key={index} question={question} last={(index === length-1) ? true : false} />
                                    })
                                }
                            </div>
                        </Fade>
                    </Collapse>
                </div>
                
            </div>
        )
    }
}


export default TestBaseItem;