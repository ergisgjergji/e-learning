import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Services from './Services/Services';
import Demo from './Demo';
import Jumbotron from './Jumbotron';
import { FormattedMessage } from 'react-intl';

class LandingPage extends Component {

    render() {
        const { locale } = this.props;

        return (
            <div className="transition-page">
                <div className="text-dark">

                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 text-center border rounded shadow-sm mt-3">
                                <Jumbotron/>
                            </div>

                            <div className="col-md-12 text-center border rounded shadow-sm my-3">
                                <Services locale={locale}/>
                            </div>

                            <div className="col-md-12 text-center border rounded shadow-sm">
                                <Demo/>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

LandingPage.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps)(LandingPage);
