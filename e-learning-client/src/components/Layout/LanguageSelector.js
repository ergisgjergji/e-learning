import React, {Component} from 'react';
import english from '../../img/england_flag.png';
import albanian from '../../img/albanian_flag.png'

import { LOCALES } from './../../i18n';

class LanguageSelector extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="language text-right">

                <div className="d-inline-block language-item" onClick={(e) => this.props.changeLanguage(LOCALES.ALBANIAN)}>
                    <img src={albanian} style={{ width: "15px", height: "12px" }}/> 🇦🇱
                </div>
                
                <div className="d-inline-block mx-2 language-item" onClick={(e) => this.props.changeLanguage(LOCALES.ENGLISH)}>
                    <img src={english}  style={{ width: "15px", height: "12px" }}/> 🇬🇧
                </div>
                
            </div>
        )
    }
}

export default LanguageSelector;
