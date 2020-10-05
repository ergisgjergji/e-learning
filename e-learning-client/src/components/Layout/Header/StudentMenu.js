import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import translate from '../../../i18n/translate';

const StudentMenu = () => {
    return (
        <>
            <Nav className="mr-auto" navbar>
                <NavItem className="text-center my-auto mx-2 border-bottom">
                    <Link to="/studentPanel" className="nav-link">
                        {translate('home')}
                    </Link>
                </NavItem>
                <NavItem className="text-center my-auto mx-2 border-bottom">
                    <Link to="/newsList" className="nav-link">
                        {translate('news')}
                    </Link>
                </NavItem>
            </Nav>
        </>
    )
};

export default StudentMenu;
