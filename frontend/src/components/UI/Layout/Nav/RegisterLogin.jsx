import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

function RegisterLogin() {
  return (
    <Nav className="ml-auto">
      <LinkContainer exact to="/register">
        <Nav.Link className="mr-sm-3" data-test="register-link">Register</Nav.Link>
      </LinkContainer>
      <LinkContainer exact to="/login">
        <Nav.Link data-test="register-link">Login</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}

export default React.memo(RegisterLogin);
