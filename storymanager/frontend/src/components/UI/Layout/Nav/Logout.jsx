import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../../../store/actions/auth';

function Logout({ username, dispatchLogout }) {
  return (
    <Nav className="ml-auto mt-2 mt-lg-0 align-items-center">
      <Nav.Item className="mr-2">
        <Navbar.Text>
          <span className="nav-welcome-text">
            <strong>{`Welcome, ${username}!`}</strong>
          </span>
        </Navbar.Text>
      </Nav.Item>
      <Nav.Item>
        <Button type="button" variant="info" size="sm" onClick={dispatchLogout}>Logout</Button>
      </Nav.Item>
    </Nav>
  );
}

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dispatchLogout: logout };

export default connect(null, mapDispatchToProps)(Logout);
