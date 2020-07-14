import React, { Component } from 'react';
import classnames from 'classnames';

import translate from '../../../i18n/translate';

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
                            <label className="ml-auto mr-3 mt-2 mb-0 text-success">
                                <i className="fa fa-check" aria-hidden="true"/> {translate('correct')}
                            </label>
                            :
                            <label className="ml-auto mr-3 mt-2 mb-0 text-danger">
                                <i className="fa fa-times" aria-hidden="true"/> {translate('incorrect')}
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
                            <label className="ml-auto mr-3 mt-2 mb-0 text-success">
                                <i className="fa fa-check" aria-hidden="true"/> {translate('correct')}
                            </label>
                            :
                            <label className="ml-auto mr-3 mt-2 mr-3 mb-0 text-danger">
                                <i className="fa fa-times" aria-hidden="true"/> {translate('incorrect')}
                            </label>
                    }
                </div>
            );
        };
    }

    render() {
        const { question } = this.props;

        return (
            <div className="col-12 col-md-11 mx-auto my-2 p-3 border-bottom">
                <div className="col-12">
                    <p className="text-left">{ question.description }</p>
                </div>
                    {
                        Object.keys(question.alternatives).length ?
                            this.renderLogic(question.type, question.alternatives)
                            : null
                    }
            </div>
        )
    }
}

export default QuestionResultItem;