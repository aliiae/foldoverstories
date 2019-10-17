import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

import StartNewStoryButton from '../landing/StartNewStoryButton';
import { logout } from '../../store/actions/auth';
import { authDefaultPropType, authPropType } from '../commonPropTypes';
import Logo from './Logo';

export function Header(props) {
  const { auth: { isAuthenticated, user }, logoutConnect } = props;

  const authLinks = (
    <Nav className="ml-auto mt-2 mt-lg-0 align-items-center">
      <Nav.Item className="mr-2">
        <Navbar.Text>
          <span className="nav-welcome-text">
            <strong>{user ? `Welcome, ${user.username}!` : ''}</strong>
          </span>
        </Navbar.Text>
      </Nav.Item>
      <Nav.Item>
        <Button type="button" variant="info" size="sm" onClick={logoutConnect}>Logout</Button>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <LinkContainer to="/register">
        <Nav.Link className="mr-3" data-test="register-link">Register</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link data-test="login-link">Login</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Logo data-test="logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <LinkContainer to="/how-to-play">
              <Nav.Link data-test="how-to-play-link">How to Play</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-md-1">
            <StartNewStoryButton classNames="nav-link bg-transparent border-0 nav-start-button" />
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = {
  auth: authPropType,
  logoutConnect: PropTypes.func.isRequired,
};
Header.defaultProps = {
  auth: authDefaultPropType,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logoutConnect: logout })(Header));
