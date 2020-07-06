import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AddQuestion extends Component {

    constructor(){
        super();
        
        this.state = {
            description: "",
            type: 0,
            alternatives: [],
            errors: null,
            toggleAlert: false
        };
        this.onToggleAlert.bind(this);
        this.onChange.bind(this);
        this.onChangeType.bind(this);
        this.renderSwitch.bind(this);
        this.isFormValid.bind(this);
        this.onQuestionSubmit.bind(this);
    }

    onToggleAlert = () => {
        this.setState({ errors: null, toggleAlert: false });
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    clearErrors = () => {
        this.setState({ errors: null });
    }

    onAlternativeChange = (index, e) => {
        let alternatives = this.state.alternatives;
        
        let current_alternative = alternatives[index];
        let updated = { ...current_alternative, description: e.target.value };

        let updatedAlternatives = [
            ...alternatives.slice(0, index),
            updated,
            ...alternatives.slice(index + 1),
          ];
        
        this.setState({ alternatives: updatedAlternatives });
    }

    onMarkCorrect = (index, e) => {
        let { alternatives, type } = this.state;
        let updatedAlternatives = [];

        if(type === 1 || type === 2)
            updatedAlternatives = alternatives.map((alt, i) => i === index ? { ...alt, correct: true } : { ...alt, correct: false });

        else {
            let current_alternative = alternatives[index];
            let updated = { ...current_alternative, correct: !current_alternative.correct };

            updatedAlternatives = [
                ...alternatives.slice(0, index),
                updated,
                ...alternatives.slice(index + 1),
              ];
        }
        
        this.setState({ alternatives: updatedAlternatives });
    }

    onChangeType = (e) => {
        let type = parseInt(e.target.value);
        let alternatives = [];
        
        if(type === 1)
            alternatives = [ {description: "True", correct: false}, {description: "False", correct: false} ];
        else
            alternatives = [ {description: "", correct: false}, {description: "", correct: false}, {description: "", correct: false}, {description: "", correct: false} ];
        
        this.setState({ type, alternatives });
    }

    isFormValid = () => {
        const { description, type, alternatives } = this.state;

        if(description === "") {
            this.setState({ errors: "Description is required!", toggleAlert: true });
            return false;
        }
        
        else if(type === 0) {
            this.setState({ errors: "Alternatives are required!", toggleAlert: true });
            return false;
        }

        let correct = 0;
        let count = alternatives.length;

        for(let i = 0; i < count; i++ ) {
            if(alternatives[i].description === "") {
                this.setState({ errors: "Alternatives cannot be blank!", toggleAlert: true });
                return false
            }

            if(alternatives[i].correct)
                correct++;
        }

        if((type === 1 && correct !== 1) || (type === 2 && correct !== 1)) {
            this.setState({ errors: "Question must have 1 correct answer!", toggleAlert: true });
            return false;
        }

        if(type === 3 && correct !== 2) {
            this.setState({ errors: "Question must have 2 correct answers!", toggleAlert: true });
            return false;
        }
        return true;
    }

    onQuestionSubmit = () => {
        // e.preventDefault();

        // Validation
        let valid = this.isFormValid();
        if(valid) {
            const { description, type, alternatives } = this.state;
            const newQuestion = { description, type, alternatives };
            
            this.props.addQuestion(newQuestion);
        }
    }

    renderSwitch = (alternatives) => {
        switch(alternatives.length) {
          case 2:
            return (
                <>
                    {
                        alternatives.map((alt, index) => {
                            return (
                                <div key={index} className="form-group col-md-6 my-2">
                                    <div className="form-check text-center">
                                        <input id={index} name={index} type="radio"
                                             className="form-check-input shadow-sm"  
                                             onChange={this.onMarkCorrect.bind(this, index)} checked={alt.correct}/>
                                        <label className="form-check-label" htmlFor={index}>
                                            {alt.description}
                                        </label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            );
          default:
              return (
                <div className="row">
                    {
                        alternatives.map((alt, index) => {
                            return (
                                <div key={index} className="form-group col-md-3 my-2">
                                    <div className="form-check">
                                    <input id={index} name={index} type="checkbox"
                                        className="form-check-input shadow-sm" 
                                        onChange={this.onMarkCorrect.bind(this, index)} checked={alt.correct}/>
                                    <input id="description" name="description"
                                        className="form-control form-control-sm shadow-sm"
                                        value={alt.description} onChange={this.onAlternativeChange.bind(this, index)}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            );
        };
    }

    render() {
        const { description, type, alternatives, errors, toggleAlert } = this.state;

        return (
            <div className="col-md-12 my-2 p-4 border shadow-sm">

                <div>
                    <div className="form-row">

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <textarea id="description" name="description"
                                className="form-control form-control-sm shadow-sm"
                                value={description} onChange={this.onChange}/>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="type">Type</label>
                            <select id="type" name="type" className="form-control form-control-sm shadow-sm" value={type} onChange={this.onChangeType}>
                                <option value={0} disabled>Select type</option>
                                <option value={1}>Yes/No</option>
                                <option value={2}>Single choice</option>
                                <option value={3}>Multi-choice</option>
                            </select>
                        </div>

                        {
                            this.renderSwitch(alternatives)
                        }

                        {
                            errors ?
                                <Alert color="danger" isOpen={toggleAlert} toggle={this.onToggleAlert} className="col-md-12 mt-2 px-4">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true"/> {errors}
                                </Alert>
                                :
                                null
                        }

                        <button type="button" className="btn btn-md btn-outline-success ml-auto mt-2 shadow" onClick={this.onQuestionSubmit}>
                            <i className="fa fa-floppy-o" aria-hidden="true"/> Save question
                        </button>

                    </div>
                </div>

            </div>
        )
    }
}

export default AddQuestion;
