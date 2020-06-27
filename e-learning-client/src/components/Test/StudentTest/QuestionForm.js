import React, { Component } from 'react'

class QuestionForm extends Component {

    constructor(){
        super();
        this.state = {
            index: null,
            type: 0,
            alternatives: []
        }
        this.renderSwitch.bind(this);
    }

    componentDidMount() {
        const { index, question } = this.props;
        this.setState({ index, type: question.type, alternatives: question.alternatives });
    }

    onMarkCorrect = (index, e) => {
        let { alternatives, type } = this.state;
        let updatedAlternatives = [];

        if(type === 1 || type === 2) 
            updatedAlternatives = alternatives.map((alt, i) => i === index ? { ...alt, checked: true } : { ...alt, checked: false });
        
        else {
            let current_alternative = alternatives[index];
            let updated = { ...current_alternative, checked: !current_alternative.checked };

            updatedAlternatives = [
                ...alternatives.slice(0, index),
                updated,
                ...alternatives.slice(index + 1),
              ];
        }
        
        this.setState({ alternatives: updatedAlternatives });
        this.props.onCompleteQuestion(this.state.index, updatedAlternatives);
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
                                    <input className="form-check-input" type="radio" id={index} checked={alt.checked} onChange={this.onMarkCorrect.bind(this, index)}/>
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
                                    <input className="form-check-input" type="checkbox" id={index} checked={alt.checked} onChange={this.onMarkCorrect.bind(this, index)}/>
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
        const { question } = this.props;
        const { alternatives } = this.state;
        
        return (
            <div className="col-12 my-2 p-3 border-bottom">
                <div className="col-12">
                    <p className="text-left mb-0">
                        { question.description }
                        { question.type === 3 ? <small> <u>(multi-choice)</u> </small> : null }
                    </p>
                </div>
                    {
                        this.renderSwitch(question.type, alternatives)
                    }
            </div>
        )
    }
}

export default QuestionForm;