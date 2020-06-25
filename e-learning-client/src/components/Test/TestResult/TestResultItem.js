import React, { Component } from 'react';
import { Collapse, Fade } from 'reactstrap';
import QuestionResultItem from './QuestionResultItem';

class TestResultItem extends Component {

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
        this.setState({ header, questions });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { header, questions, isOpen } = this.state;

        return (
            <div className="col-12 mx-auto">

                <button className="btn btn-md btn-secondary shadow" onClick={this.onToggle}>{header}</button>
                <hr/>

                <div className="paper mt-4">
                    <Collapse isOpen={isOpen}>
                        <Fade in={isOpen}>
                            <div className="px-4 mb-4 border">
                                <div className="text-center h5 m-4"><u>{header}</u></div>
                                {
                                    questions.map((question, index) => {
                                        return <QuestionResultItem key={index} question={question}/>
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

export default TestResultItem;