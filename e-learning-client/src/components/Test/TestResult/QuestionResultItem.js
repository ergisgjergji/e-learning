import React, { Component } from 'react';
import classnames from 'classnames';

class QuestionResultItem extends Component {

    constructor(){
        super();
        this.renderLogic.bind(this);
    }

    renderLogic = (type, alternatives) => {
        const correctAlternatives = alternatives.filter(alt => alt.correct === true);

        switch(type) {
          case 1:
            return (
                <div className="row">
                    {
                        alternatives.map((alt, index) => {
                            return (
                                <div key={index} className="col-6 col-lg-6 text-center mx-auto mt-2">
                                    <input className="form-check-input" type="radio" id={index} checked={alt.checked} disabled/>
                                    <label htmlFor={index} className={classnames("form-check-label ", {"text-success": alt.correct})} >
                                        {alt.description}
                                    </label>
                                </div>
                            )
                        })
                    }
                    {
                        (correctAlternatives[0].checked) ?
                            <label className="mt-2 mb-0 ml-auto text-success">
                                <i className="fa fa-check" aria-hidden="true"/> Correct
                            </label>
                            :
                            <label className="mt-2 mb-0 ml-auto text-danger">
                                <i className="fa fa-times" aria-hidden="true"/> Incorrect
                            </label>
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
                                    <input className="form-check-input" type="checkbox" id={index} checked={alt.checked} disabled/>
                                    <label htmlFor={index} className={classnames("form-check-label ", {"text-success": alt.correct})} >
                                        {alt.description}
                                    </label>
                                </div>
                            )
                        })
                    }
                    {
                         ((type === 2 && correctAlternatives[0].checked) || (type === 3 && correctAlternatives[0].checked && correctAlternatives[1].checked)) 
                            ?
                            <label className="mt-2 mb-0 ml-auto text-success">
                                <i className="fa fa-check" aria-hidden="true"/> Correct
                            </label>
                            :
                            <label className="mt-2 mb-0 ml-auto text-danger">
                                <i className="fa fa-times" aria-hidden="true"/> Incorrect
                            </label>
                    }
                </div>
            );
        };
    }

    render() {
        const { question } = this.props;

        return (
            <div className="col-12 my-2 p-3 border-bottom">
                <div className="col-12">
                    <p className="text-left">{ question.description }</p>
                </div>
                    {
                        this.renderLogic(question.type, question.alternatives)
                    }
            </div>
        )
    }
}

export default QuestionResultItem;