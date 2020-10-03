import React, { Component } from 'react';
import { Modal, ModalBody, Tooltip, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewsById } from '../../redux/actions/newsActions';

import translate from '../../i18n/translate';
import { injectIntl } from 'react-intl';

class NewsDetails extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            header: "",
            body: "",
            attachments: [],
            errors: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getNewsById(id, this.props.history);
    }

    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });

            const { id, header, body, attachments } = nextProps.news;
            this.setState({ id, header, body, attachments });
    }

    render() {
        const { id, header, body, attachments } = this.state;

        return (
            <div>
                <button className="btn my-btn-secondary btn-sm shadow mt-3 mb-1" onClick={() => this.props.history.goBack()}> 
                    <i className="fa fa-arrow-left" aria-hidden="true"/> {translate('back')}
                </button>
            </div>
        )
    }
}

NewsDetails.propTypes = {
    news: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    getNewsById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    news: state.newsStore.news,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { getNewsById })(injectIntl(NewsDetails));