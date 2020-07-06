import React, { Component } from 'react'
import QuestionResultItem from './QuestionResultItem';

export default class TestResultPaper extends Component {
    
    render() {
        const { header, questions, completed_time, total_points, scored_points, passed } = this.props.test;
        const score_percent = Math.round((scored_points*100/total_points) * 10) / 10;

        return (
            <div className="px-2 mb-4 border">

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
                                {`${scored_points} (${score_percent}%)`}
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
                    <small>
                        * Note: <i>Minimal passing score is 40%</i>
                    </small>
                </div>
            </div>
        )
    }
}
