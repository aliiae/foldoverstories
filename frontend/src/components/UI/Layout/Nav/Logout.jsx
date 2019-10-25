import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../../../store/actions/auth';

function Logout({ username, dispatchLogout }) {
  const history = useHistory();

  const onClick = () => {
    dispatchLogout().then(() => {
      history.push('/');
    });
  };

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
        <Button type="button" variant="info" size="sm" onClick={onClick}>Logout</Button>
      </Nav.Item>
    </Nav>
  );
}

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dispatchLogout: logout };

export default withRouter(connect(null, mapDispatchToProps)(Logout));
