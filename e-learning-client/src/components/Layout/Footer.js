import React, {Component} from 'react';
import english from '../../img/england_flag.png';
import albanian from '../../img/albanian_flag.png'

import { LOCALES } from '../../i18n';
import translate from '../../i18n/translate';

class Footer extends Component {

    constructor() {
        super();
        this.state = {
            year: '',
            author: '',
            facebook: '',
            linkedin: '',
            github: ''
        }
    }

    componentDidMount() {
        let nowDate = new Date();
        let year = nowDate.getFullYear();

        this.setState({
            year,
            author: 'Ergis Gjergji',
            facebook: 'https://www.facebook.com/ergis.gjergji',
            linkedin: 'https://www.linkedin.com/in/ergis-gjergji-072a2b161',
            github: 'https://github.com/ergisgjergji'
        });
    }

    render() {
        const { year, author, facebook, linkedin, github } = this.state;

        return (
            <footer>

                <div className="row">

                    <div className="col-12 mx-auto text-center py-2">

                        <div className="col-12 my-1 social-media">
                            <div className="d-inline-block mx-2">
                                <a href={facebook} target="_blank">
                                    <i className="fa fa-facebook-square fa-2x" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="d-inline-block mx-2">
                                <a href={linkedin} target="_blank">
                                    <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="d-inline-block mx-2">
                                <a href={github} target="_blank">
                                    <i className="fa fa-github fa-2x" aria-hidden="true"/>
                                </a>
                            </div>
                        </div>

                        <small className="gray-text">
                            <i className="fa fa-copyright" aria-hidden="true"/> {translate('copyright')} {year}: 
                            <span> {author} </span>
                        </small>

                    </div>

                    <div className="col-12 pb-1 language-container border-top border-secondary text-white">
                        <div className="d-flex flex-row justify-content-start">

                            <div className="d-inline-block language-item ml-2" onClick={(e) => this.props.changeLanguage(LOCALES.ALBANIAN)}>
                                <img src={albanian} style={{ width: "13px", height: "10px" }}/> Shqip
                            </div>    
                            <div className="d-inline-block language-item ml-2" onClick={(e) => this.props.changeLanguage(LOCALES.ENGLISH)}>
                                <img src={english}  style={{ width: "13px", height: "10px" }}/> English
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;