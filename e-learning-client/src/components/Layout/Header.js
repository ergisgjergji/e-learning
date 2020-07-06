import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/authActions';

import translate from './../../i18n/translate';

class Header extends Component {

    constructor(){
        super();

        this.state = {
            isAuthenticated: false,
            user: {},
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const { user, isAuthenticated } = this.props.authStore;
        this.setState({ user, isAuthenticated });
    }
    
    componentWillReceiveProps(nextProps) {
        
        const { isAuthenticated, user } = nextProps.authStore;
        if(this.state.user.full_name !== user.full_name || this.state.user.username !== user.username || this.state.isAuthenticated !== isAuthenticated)
            this.setState({ isAuthenticated, user });
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    }

    renderLogic = (isAuthenticated, user) => {

        const admin_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem className="text-center my-auto mx-2 border-bottom rounded">
                        <Link to="/adminPanel" className="nav-link">
                            {translate('home')}
                        </Link>
                    </NavItem>
                    <NavItem className="text-center my-auto mx-2 border-bottom rounded">
                        <Link to="/adminPanel/students" className="nav-link">
                            {translate('manage-students')}
                        </Link>
                    </NavItem>
                    <NavItem className="text-center my-auto mx-2 border-bottom rounded">
                        <Link to="/adminPanel/teachers" className="nav-link">
                            {translate('manage-teachers')}
                        </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const teacher_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem className="text-center my-auto mx-2 border-bottom rounded">
                        <Link to="/teacherPanel" className="nav-link">
                            {translate('home')}
                        </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const student_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem className="text-center my-auto mx-2 border-bottom rounded">
                        <Link to="/studentPanel" className="nav-link">
                            {translate('home')}
                        </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const logged_out_menu = (
            <>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/login" className="nav-link"> 
                            <i className="fa fa-sign-in" aria-hidden="true"/> {translate('login')} 
                        </Link>
                    </NavItem>
                </Nav>
            </>
        );

        if(!isAuthenticated)
            return logged_out_menu;
        else {
            switch(user.role) {
                case "ADMIN":
                    return admin_menu;
                case "TEACHER":
                    return teacher_menu;
                case "STUDENT":
                    return student_menu;
            }
        }
    }

    render() {
        const { user, isAuthenticated } = this.state;

        const profile_menu = (
            <Nav className="ml-auto" navbar>
                <NavItem className="text-left my-auto mx-2">
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret> { translate('welcome', {name: user.full_name}) } </DropdownToggle>
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
        );

        return (
            <Navbar color="primary" dark expand="md" className="mb-0 border-bottom border-white">
                <Container>
                    <Link to="/" className="navbar-brand px-3 border rounded"> E-Learning </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {
                            this.renderLogic(isAuthenticated, user)
                        }
                        {
                            isAuthenticated ? profile_menu : null
                        }

                    </Collapse>
                </Container>
            </Navbar>
        )
    }
};

Header.propTypes = {
    authStore: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps, { logout })(Header);
