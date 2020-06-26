import React, { Component } from 'react';
import { Collapse, Fade } from 'reactstrap';
import QuestionResultItem from './QuestionResultItem';

class TestResultItem extends Component {

    constructor(){
        super();

        this.state = {
            header: "",
            completed_time: "",
            total_points: "",
            scored_points: "",
            passed: false,
            questions: [],
            isOpen: false
        };
        this.onToggle.bind(this);
    }

    componentDidMount() {
        const { header, questions, completed_time, total_points, scored_points, passed } = this.props.test;
        this.setState({ header, questions, completed_time, total_points, scored_points, passed });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { header, questions, completed_time, total_points, scored_points, passed, isOpen } = this.state;

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

                                <div className="col-12 col-md-8 col-lg-5 mt-4 shadow p-0 ml-auto">

                                    <div className="col-12 border rounded">
                                        <div className="row">
                                            <div className="col-6 text-center border-right font-weight-bold">Total:</div>
                                            <div className="col-6 text-center">{total_points}</div>
                                        </div>
                                    </div>

                                    <div className="col-12 border rounded">
                                        <div className="row">
                                            <div className="col-6 text-center border-right font-weight-bold">Score:</div>
                                            <div className="col-6 text-center">
                                                {`${scored_points} (${scored_points*100/total_points}%)`}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 border rounded">
                                        <div className="row">
                                            <div className="col-6 text-center border-right font-weight-bold">Result:</div>
                                            {
                                                passed ? 
                                                    <div className="col-6 text-center text-white bg-success">PASS</div> 
                                                    : 
                                                    <div className="col-6 text-center text-white bg-danger">FAIL</div>
                                            }
                                        </div>
                                    </div>

                                </div>
                                
                                <div className="col-12 my-1 p-0 text-right">
                                    <b>Note:</b> <i>Minimal passing score is 40%</i>
                                </div>

                            </div>
                        </Fade>
                    </Collapse>
                </div>
                
            </div>
        )
    }
}

export default TestResultItem;