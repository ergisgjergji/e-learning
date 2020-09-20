import React from 'react';
import { Link } from 'react-router-dom';
import {  Nav, NavItem } from 'reactstrap';
import translate from '../../../i18n/translate';

const PublicMenu = () => {
    return (
        <>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="/login" className="nav-link"> 
                        <i className="fa fa-sign-in" aria-hidden="true"/> {translate('login')} 
                    </Link>
                </NavItem>
            </Nav>
        </>
    )
}

export default PublicMenu;
