import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PublicMenu from './PublicMenu';
import AdminMenu from './AdminMenu';
import TeacherMenu from './TeacherMenu';
import StudentMenu from './StudentMenu';
import ProfileMenu from './ProfileMenu';
import { roles } from '../../../utils/constants';

class Header extends Component {

    constructor(){
        super();

        this.state = {
            isAuthenticated: false,
            user: {},
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
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

    renderLogic = (isAuthenticated, user) => {

        if(!isAuthenticated)
            return (<PublicMenu/>);
        else {
            switch(user.role) {
                case roles.admin:
                    return <AdminMenu/>;
                case roles.teacher:
                    return <TeacherMenu/>;
                case roles.student:
                    return <StudentMenu/>;
            }
        }
    }

    render() {
        const { user, isAuthenticated } = this.state;

        return (
            <Navbar dark expand="md" className="my-bg-primary mb-0">
                <Container>
                    <Link to="/" className="navbar-brand px-3 border rounded"> E-Learning </Link>
                    <NavbarToggler className="" onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {
                            this.renderLogic(isAuthenticated, user)
                        }
                        {
                            isAuthenticated ? <ProfileMenu name={user.full_name}/> : null
                        }

                    </Collapse>
                </Container>
            </Navbar>
        )
    }
};

Header.propTypes = {
    authStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps, {  })(Header);
