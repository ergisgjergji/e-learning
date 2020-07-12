import React, { Component } from 'react';
import { Collapse, Fade } from 'reactstrap';
import QuestionBaseItem from './QuestionBaseItem';

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
        this.setState({ header, questions });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { header, questions, isOpen } = this.state;

        return (
            <div className="col-12 mt-1 p-0 mx-auto">

                <button className="btn btn-md btn-secondary shadow" onClick={this.onToggle}>
                     {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {header}
                </button>
                <hr/>

                <div className="paper mt-4">
                    <Collapse isOpen={isOpen}>
                        <Fade in={isOpen}>
                            <div className="px-2 mb-4 border">
                                <div className="text-center h5 m-4"><u>{header}</u></div>
                                {
                                    questions.map((question, index) => {
                                        return <QuestionBaseItem key={index} question={question}/>
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