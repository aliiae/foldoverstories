import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import { logout } from '../../actions/auth';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';
import NavLink from 'react-bootstrap/NavLink';

const propTypes = {
  auth: authPropType,
  logoutConnect: PropTypes.func.isRequired,
};
const defaultProps = {
  auth: authDefaultProp,
};

export class Header extends React.Component {
  title = 'Paper Stories';

  render() {
    const { auth, logoutConnect } = this.props;
    const { isAuthenticated, user } = auth;

    const authLinks = (
      <Nav className="ml-auto mt-2 mt-lg-0">
        <Nav.Item className="mr-2">
          <Navbar.Text><strong>{user ? `Welcome, ${user.username}!` : ''}</strong></Navbar.Text>
        </Nav.Item>
        <Nav.Item>
          <Button type="button" variant="info" size="sm" onClick={logoutConnect}>Logout</Button>
        </Nav.Item>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto">
        <LinkContainer to="/register">
          <Nav.Link>Register</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      </Nav>
    );

    return (
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <LinkContainer to="/">
          <Navbar.Brand>{this.title}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutConnect: logout })(Header);
