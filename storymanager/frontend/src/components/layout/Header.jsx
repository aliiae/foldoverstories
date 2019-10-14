import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

import Button from 'react-bootstrap/Button';
import { logout } from '../../store/actions/auth';
import { authDefaultPropType, authPropType } from '../commonPropTypes';
import SvgFoldoverLogo from '../shared/SvgFoldoverLogo';

const propTypes = {
  auth: authPropType,
  logoutConnect: PropTypes.func.isRequired,
};
const defaultProps = {
  auth: authDefaultPropType,
};

function Logo() {
  return (
    <LinkContainer to="/">
      <Navbar.Brand className="align-items-center">
        <div style={{ display: 'flex' }}>
          <SvgFoldoverLogo width="32" height="32" />
          <span
            style={{ display: 'flex', flexFlow: 'column', lineHeight: '0.9' }}
            className="mr-1 ml-1"
          >
            <span>FOLD</span>
            <span>-OVER</span>
          </span>
          <span>STORIES</span>
        </div>
      </Navbar.Brand>
    </LinkContainer>
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

export default withRouter(connect(mapStateToProps, { logoutConnect: logout })(Header));
