import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function RegisterLogin() {
  return (
    <Nav className="ml-auto">
      <Nav.Link as={Link} exact="true" to="/register" className="mr-sm-3" data-test="register-link">
        Register
      </Nav.Link>
      <Nav.Link as={Link} exact="true" to="/login" data-test="register-link">Login</Nav.Link>
    </Nav>
  );
}

export default React.memo(RegisterLogin);
