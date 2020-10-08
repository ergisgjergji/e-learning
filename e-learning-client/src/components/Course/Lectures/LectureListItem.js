import React, { Component } from 'react';
import { Collapse, Fade, Alert } from 'reactstrap';
import translate from './../../../i18n/translate';
import FilesTable from './../../FilesTable/FilesTable';

class LectureListItem extends Component {

    constructor(){
        super();

        this.state = {
            name: "",
            materials: [],
            isOpen: false
        };
        this.onToggle.bind(this);
    }

    componentDidMount() {
        const { name, materials } = this.props.lecture;
        this.setState({ name, materials });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { name, materials, isOpen } = this.state;
        const length = materials.length;

        return (
            <div className="col-12 mt-4 p-0 mx-auto">

                <button className="btn btn-sm my-btn-secondary shadow" onClick={this.onToggle}>
                     {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {name}
                </button>

                <Collapse isOpen={isOpen} className="mt-3">
                    <Fade in={isOpen} className="border-bottom">
                        <div>
                        {
                            (materials.length > 0) ?
                                <FilesTable fileType="material" files={materials} />
                                :
                                <Alert color="info" className="text-center">
                                    <i className="fa fa-info-circle" aria-hidden="true"/> {translate('materials.empty')}
                                </Alert>
                        }
                        </div>
                    </Fade>
                </Collapse>
                
            </div>
        )
    }
}

export default LectureListItem;
