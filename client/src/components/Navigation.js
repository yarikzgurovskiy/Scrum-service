import React from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Glyphicon } from 'react-bootstrap';
import logo from './../images/nav-logo.png';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { isUserAuth, getUserId } from './../auth/index';

import { PulseLoader } from 'react-spinners';

const Navigation = ({ user, history, actions }) => {
    const authRightMenu = (isUserAuth() &&
        (user._id
            ? <Nav pullRight>
                <NavDropdown title={`${user.first_name} ${user.last_name}`} id="basic-nav-dropdown">
                    <LinkContainer to={`/profile/${getUserId()}`} exact>
                        <MenuItem><Glyphicon glyph="user" /> Profile</MenuItem>
                    </LinkContainer>
                    <MenuItem divider />
                    <MenuItem onClick={() => { actions.logoutUser(); history.push('/signin') }}><Glyphicon glyph="log-out" /> Sign Out</MenuItem>
                </NavDropdown>
            </Nav>
            : <div className={'pull-right'}><PulseLoader color={'white'} /></div>
        )
    );

    const notAuthRightMenu = (
        <Nav pullRight>
            <LinkContainer to='/signin' exact>
                <NavItem><Glyphicon glyph="log-in" /> Sign In</NavItem>
            </LinkContainer>
            <LinkContainer to='/signup' exact>
                <NavItem><Glyphicon glyph="user" /> Sign Up</NavItem>
            </LinkContainer>
        </Nav>
    )

    const authLeftNavItems = (
        <LinkContainer to={`/projects`} exact>
            <NavItem><Glyphicon glyph="list-alt" /> Projects</NavItem>
        </LinkContainer>
    )

    const usersNavItem = (
        <LinkContainer to={`/users`} exact>
            <NavItem><Glyphicon glyph="user" /> Users</NavItem>
        </LinkContainer>
    )

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/"><img src={logo} width="50" height="40" alt='Brand Logo' /></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/' exact>
                        <NavItem><Glyphicon glyph="home" /> Home</NavItem>
                    </LinkContainer>
                    {isUserAuth() && authLeftNavItems}
                    {(user) && (user.role === 'admin') && usersNavItem}
                </Nav>
                {isUserAuth() ? authRightMenu : notAuthRightMenu}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;