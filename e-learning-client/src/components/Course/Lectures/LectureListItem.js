import React, { Component } from 'react';
import { Collapse, Fade, Alert, Tooltip } from 'reactstrap';
import translate from './../../../i18n/translate';
import FilesTable from './../../FilesTable/FilesTable';
import AddMaterialModal from './AddMaterialModal';

class LectureListItem extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            isDeleteTooltipOpen: false
        };
        this.onToggle.bind(this);
        this.toggleDeleteTooltip.bind(this);
    }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    toggleDeleteTooltip = () => {
        this.setState({ isDeleteTooltipOpen: !this.state.isDeleteTooltipOpen });
    }

    deleteLecture = (id) => {
        this.props.deleteLecture(id);
    }

    render() {
        const { id, name, materials } = this.props.lecture;
        const { course_name } = this.props;
        const { isOpen, isDeleteTooltipOpen } = this.state;

        return (
            <div className="col-12 mt-4 p-0 mx-auto">

                <div className="pb-2 border-bottom">
                    <button className="btn btn-sm my-btn-secondary shadow" onClick={this.onToggle}>
                        {isOpen ? <i className="fa fa-caret-up"/> : <i className="fa fa-caret-down"/>} {name}
                    </button>

                    <button id="delete-tooltip" className="btn btn-sm btn-outline-danger shadow float-right" onClick={this.deleteLecture.bind(this, id)}> 
                        <i className="fa fa-trash" aria-hidden="true" />
                    </button>
                    <Tooltip placement="top" isOpen={isDeleteTooltipOpen} target="delete-tooltip" toggle={this.toggleDeleteTooltip}>
                        {translate('delete')}
                    </Tooltip>

                    <AddMaterialModal course_name={course_name} lecture_id={id} />
                    
                </div>

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
