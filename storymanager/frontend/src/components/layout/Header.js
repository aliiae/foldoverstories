import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import { logout } from '../../actions/auth';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';
import { WEBSITE_TITLE } from '../../settings';

const propTypes = {
  auth: authPropType,
  logoutConnect: PropTypes.func.isRequired,
};
const defaultProps = {
  auth: authDefaultProp,
};

function Logo() {
  return (
    <Navbar.Brand className="align-items-center">
      <div style={{ display: 'flex' }}>
        <LinkContainer to="/">
          <img
            src="/static/img/foldover_logo.svg"
            width="32"
            height="32"
            className="d-inline-block align-center mr-2 logo-img"
            alt={`${WEBSITE_TITLE} logo`}
          />
        </LinkContainer>
        <span
          style={{ display: 'flex', flexFlow: 'column', lineHeight: '0.9' }}
          className="mr-1"
        >
          <span>FOLD</span>
          <span>-OVER</span>
        </span>
        <LinkContainer to="/">
          <span>STORIES</span>
        </LinkContainer>
      </div>
    </Navbar.Brand>
  );
}

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
        <Nav.Link className="mr-3">Register</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Logo />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <LinkContainer to="/how-to-play">
              <Nav.Link>How to Play</Nav.Link>
            </LinkContainer>
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutConnect: logout })(Header);
