import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Button from 'react-bulma-components/lib/components/button';

function RegisterLogin() {
  return (
    <Navbar.Item renderAs="div">
      <Button.Group hasAddons={false}>
        <Link to="/register">
          <Button color="info" data-test="register-link">Register</Button>
        </Link>
        <Link to="/login">
          <Button color="light" data-test="login-link">Login</Button>
        </Link>
      </Button.Group>
    </Navbar.Item>
  );
}

export default React.memo(RegisterLogin);
