import React from 'react';
import { Link } from 'react-router-dom';
import {  Nav, NavItem } from 'reactstrap';
import translate from '../../../i18n/translate';

const AdminMenu = () => {
    return (
        <>
            <Nav className="mr-auto" navbar>
                <NavItem className="text-center my-auto mx-2 border-bottom">
                    <Link to="/adminPanel" className="nav-link">
                        {translate('home')}
                    </Link>
                </NavItem>
                <NavItem className="text-center my-auto mx-2 border-bottom">
                    <Link to="/adminPanel/students" className="nav-link">
                        {translate('manage-students')}
                    </Link>
                </NavItem>
                <NavItem className="text-center my-auto mx-2 border-bottom">
                    <Link to="/adminPanel/teachers" className="nav-link">
                        {translate('manage-teachers')}
                    </Link>
                </NavItem>
            </Nav>
        </>
    )
};

export default AdminMenu;
