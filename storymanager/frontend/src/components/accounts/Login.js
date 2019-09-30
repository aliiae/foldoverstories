import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login(props) {
  const [form, setValues] = useState({
    username: '',
    password: '',
  });

  const { loginConnect, isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    loginConnect(username, password);
  };

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Col md={6} className="m-auto">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center">Login</h1>
          </Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="fromLoginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChange}
                value={form.username}
              />
            </Form.Group>
            <Form.Group controlId="fromLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={form.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
            <Form.Text>
              Don&apos;t have an account?
              {' '}
              <Link to="/register">Register</Link>
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

Login.propTypes = {
  loginConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
Login.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginConnect: login })(Login);
