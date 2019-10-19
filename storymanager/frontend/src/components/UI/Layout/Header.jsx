import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import StartNewStoryWrapper from '../../Story/Editor/StartNewStoryWrapper';
import { logout } from '../../../store/actions/auth';
import { authDefaultPropType, authPropType } from '../../commonPropTypes';
import Logo from '../Figure/Logo';

export function Header(props) {
  const { auth: { isAuthenticated, user }, dispatchLogout } = props;

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
        <Button type="button" variant="info" size="sm" onClick={dispatchLogout}>Logout</Button>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Link as={Link} exact="true" to="/register" className="mr-md-3" data-test="register-link">
        Register
      </Nav.Link>
      <Nav.Link as={Link} exact="true" to="/login" data-test="register-link">Login</Nav.Link>
    </Nav>
  );

  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Logo data-test="logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} exact="true" to="/how-to-play" data-test="how-to-play-link">
              How to Play
            </Nav.Link>
          </Nav>
          <Nav className="ml-md-1">
            <StartNewStoryWrapper>
              <Nav.Link>Start a New Story</Nav.Link>
            </StartNewStoryWrapper>
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = {
  auth: authPropType,
  dispatchLogout: PropTypes.func.isRequired,
};
Header.defaultProps = {
  auth: authDefaultPropType,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { dispatchLogout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
