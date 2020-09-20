import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import translate from '../../../i18n/translate';

 const ProfileMenu = ({ name }) => {

    return (
        <Nav className="ml-auto" navbar>
            <NavItem className="text-left my-auto mx-2">
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret> { translate('welcome', { name }) } </DropdownToggle>
                    <DropdownMenu right className="p-0">
                        <Link to="/profile/edit" className="text-dark">
                            <DropdownItem className="py-2"> 
                                <i className="fa fa-user-circle mr-1" aria-hidden="true"/> {translate('edit-profile')} 
                            </DropdownItem>
                        </Link>
                        <DropdownItem divider className="m-0"/>
                        <Link to="/profile/changePassword" className="text-dark">
                            <DropdownItem  className="py-2"> 
                                <i className="fa fa-key mr-1" aria-hidden="true"/> {translate('change-password')}
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>

            <NavItem className="text-left my-auto mx-2">
                <Link to="/logout" className="nav-link"> 
                    {translate('logout')} <i className="fa fa-sign-out" aria-hidden="true"/> 
                </Link>
            </NavItem>
        </Nav>
    )
}

export default ProfileMenu;