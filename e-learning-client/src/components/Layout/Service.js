import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';

class Service extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter = () => {
        this.setState({ isFlipped: true });
    }

    handleMouseLeave = () => {
        this.setState({ isFlipped: false });
    }

    render() {
        const { features } = this.props;
        const { isFlipped } = this.state;

        return (
            <div className="service my-2" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <ReactCardFlip isFlipped={isFlipped}>
                    <div className="front">
                        {this.props.children}
                    </div>

                    <div className="back">
                        <div className="text-center">
                            <h5 className="text-center pb-2 border-bottom border-dark"> Features </h5>
                        </div>
                        <div className="text-left mt-3">
                            {features.map((feature, index) => (
                                <div key={index} className="d-block my-1"> 
                                    <i className="fa fa-asterisk" aria-hidden="true" /> {feature} 
                                </div>
                            ))}
                        </div>
                    </div>
                </ReactCardFlip>
            </div>
        )
    }
}

export default Service;
