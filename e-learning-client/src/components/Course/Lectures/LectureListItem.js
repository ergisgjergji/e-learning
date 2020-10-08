import React, { Component } from 'react';
import { Collapse, Fade, Alert, Tooltip } from 'reactstrap';
import translate from './../../../i18n/translate';
import FilesTable from './../../FilesTable/FilesTable';

class LectureListItem extends Component {

    constructor() {
        super();

        this.state = {
            id: 0,
            name: "",
            materials: [],
            isOpen: false,
            isTooltipOpen: false
        };
        this.onToggle.bind(this);
        this.toggleTooltip.bind(this);
    }

    componentDidMount() {
        const { id, name, materials } = this.props.lecture;
        this.setState({ id, name, materials });
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    toggleTooltip = () => {
        this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
    }

    deleteLecture = (id) => {
        this.props.deleteLecture(id);
    }

    render() {
        const { id, name, materials, isOpen, isTooltipOpen } = this.state;

        return (
            <div className="col-12 mt-4 p-0 mx-auto border-bottom">

                <button className="btn btn-sm my-btn-secondary shadow" onClick={this.onToggle}>
                     {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {name}
                </button>

                <button id="delete-tooltip" className="btn btn-sm my-btn-danger shadow float-right" onClick={this.deleteLecture.bind(this, id)}> 
                    <i className="fa fa-trash-o text-white" aria-hidden="true" />
                </button>
                <Tooltip placement="right" isOpen={isTooltipOpen} target="delete-tooltip" toggle={this.toggleTooltip}>
                    {translate('delete')}
                </Tooltip>

                <Collapse isOpen={isOpen} className="mt-3">
                    <Fade in={isOpen}>
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
