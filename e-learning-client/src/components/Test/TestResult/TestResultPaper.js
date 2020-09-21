import React, { Component } from 'react'
import QuestionResultItem from './QuestionResultItem';
import Score from './Score';

export default class TestResultPaper extends Component {
    
    render() {
        const { header, questions, completed_time, total_points, scored_points, passed } = this.props.test;
        const score_percent = Math.round((scored_points*100/total_points) * 10) / 10;

        return (
            <div className="px-2 mb-4 border">
                <div className="text-center h5 m-4 pt-2"><u>{header}</u></div>
                {
                    questions.map((question, index) => {
                        return <QuestionResultItem key={index} question={question}/>
                    })
                }
                <Score total={total_points} score={scored_points} percentage={score_percent} passed={passed} />
            </div>
        )
    }
}
