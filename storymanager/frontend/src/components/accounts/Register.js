import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { register } from '../../actions/auth';

function Register(props) {
  const [form, setValues] = useState({
    username: '',
    password: '',
    password2: '',
  });
  const { registerConnect, isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  // TODO: invalid-feedback for invalid or not matching passwords, taken usernames
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      alert('Passwords do not match');
    } else {
      const { username, password } = form;
      registerConnect({ username, password });
    }
  };

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value, });
  };

  return (
    <Col md={6} className="m-auto">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center">Register</h1>
          </Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="fromRegisterUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChange}
                value={form.username}
              />
            </Form.Group>
            <Form.Group controlId="fromRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={form.password}
              />
            </Form.Group>
            <Form.Group controlId="fromRegisterConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                onChange={onChange}
                value={form.password2}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
            <Form.Text>
              Already have an account?
              {' '}
              <Link to="/login">Login</Link>
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerConnect: PropTypes.func.isRequired,
};
Register.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,
  { registerConnect: register })(Register);
