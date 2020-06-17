import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/authActions';

class Header extends Component {

    constructor(){
        super();

        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
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
                    <NavItem>
                        <Link to="/adminPanel" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">
                            <i className="fa fa-user-circle mr-1"> Welcome, {user.full_name}</i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}> Logout </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const teacher_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/teacherPanel" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">
                            <i className="fa fa-user-circle mr-1"> Welcome, {user.full_name}</i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}> Logout </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const student_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/studentPanel" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">
                            <i className="fa fa-user-circle mr-1"> Welcome, {user.full_name}</i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}> Logout </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const logged_out_menu = (
            <>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/login" className="nav-link"> Login </Link>
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

        const { user, isAuthenticated } = this.props.authStore;

        return (
            <Navbar color="primary" dark expand="sm" className="mb-4">
                <Container>
                    <Link to="/" className="navbar-brand"> E-Learning </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {
                            this.renderLogic(isAuthenticated, user)
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
