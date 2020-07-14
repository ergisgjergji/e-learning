import React, { Component } from 'react';
import classnames from 'classnames';

class QuestionBaseItem extends Component {

    constructor(){
        super();
        this.renderSwitch.bind(this);
    }

    renderSwitch = (type, alternatives) => {

        switch(type) {
    
          case 1:
            return (
                <div className="row">
                    {
                        alternatives.map((alt, index) => {
                            return (
                                <div key={index} className="col-6 col-lg-3 text-center mx-auto mt-2">
                                    <input className="form-check-input" type="radio" id={index} checked={alt.correct} disabled/>
                                    <label className="form-check-label" htmlFor={index}>{alt.description}</label>
                                </div>
                            )
                        })
                    }
                </div>
            );
    
          default:
              return (
                <div className="row">
                    {
                        alternatives.map((alt, index) => {
                            return (
                                <div key={index} className="col-6 col-md-6 col-lg-6 text-center mx-auto mt-2">
                                    <input className="form-check-input" type="checkbox" id={index} checked={alt.correct} disabled/>
                                    <label className="form-check-label" htmlFor={index}>{alt.description}</label>
                                </div>
                            )
                        })
                    }
                </div>
            );
        };
    }

    render() {
        const { question, last } = this.props;

        return (
            <div className={classnames("col-12 col-md-11 mx-auto my-2 p-3 ", {"border-bottom": !last})}>
                <div className="col-12">
                    <p className="text-left">{ question.description }</p>
                </div>
                    {
                        this.renderSwitch(question.type, question.alternatives)
                    }
            </div>
        )
    }
}

export default QuestionBaseItem;